# 🔧 4-API Fallback Architecture - Complete Documentation

## 📋 Overview

This system implements an intelligent 4-API pool with automatic fallback, health monitoring, and token tracking. When one API fails or hits rate limits, the system seamlessly switches to the next healthy API.

---

## 🏗️ Architecture Components

### 1. **API Pool Structure**

Each API in the pool has the following properties:

```javascript
{
  key: 'YOUR_API_KEY',           // Gemini API key
  model: 'gemini-1.5-flash',     // Model to use
  health: 100,                    // Health score (0-100)
  fails: 0,                       // Failure count
  tokens: 0,                      // Total tokens used
  lastFail: 0,                    // Timestamp of last failure
  active: true,                   // Whether API is active
  name: 'Primary'                 // Friendly name
}
```

### 2. **Health System**

**Health Score (0-100):**
- Starts at 100 (perfect health)
- +5 on successful API call
- -20 on failed API call
- APIs with health < 20 are deactivated
- Inactive APIs recover +10 health every 60 seconds

**Deactivation Triggers:**
- Rate limiting (429 error)
- Invalid API key (400/403 errors)
- Content blocking
- Network errors
- Low health score (< 20)

---

## 🔄 Fallback Logic

### Automatic Switching

The system switches APIs when:

1. **Rate Limit (429)** - Immediate switch + 2s cooldown
2. **Invalid Key (400/403)** - Immediate switch
3. **Content Blocked** - Try next API
4. **Network Error** - Switch + 1s retry
5. **Inactive API** - Skip to next healthy API

### API Selection Algorithm

```javascript
function getHealthyApi() {
  // Filter: active + has key + health > 20
  let candidates = apiPool.filter(api => 
    api.active && api.key && api.health > 20
  );
  
  // Sort by:
  // 1. Health (descending)
  // 2. Tokens used (ascending)
  // 3. Failure count (ascending)
  candidates.sort((a, b) => {
    if (b.health !== a.health) return b.health - a.health;
    if (a.tokens !== b.tokens) return a.tokens - b.tokens;
    return a.fails - b.fails;
  });
  
  return candidates[0]; // Return healthiest
}
```

---

## 🎯 Key Features

### 1. **Intelligent Fallback**
- Automatically switches to healthiest API
- Tracks failure patterns
- Prevents cascading failures

### 2. **Health Monitoring**
- Real-time health tracking
- Automatic recovery after cooldown
- Predictive failure prevention

### 3. **Token Management**
- Tracks token usage per API
- Balances load across APIs
- Prevents quota exhaustion

### 4. **Error Handling**
- Specific handling for each error type
- Graceful degradation to demo mode
- User-friendly error messages

### 5. **Statistics Tracking**
```javascript
apiStats = {
  total: 0,      // Total API calls
  success: 0,    // Successful calls
  fails: 0,      // Failed calls
  switches: 0    // Number of API switches
}
```

---

## 📊 API Call Flow

```
┌─────────────────────────────────────────────┐
│  User requests AI-generated content         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Check cache (if cacheId provided)          │
│  Return cached result if found              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Recover inactive APIs (60s cooldown)       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Get current API from pool                  │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Is API active and has key?                 │
└──────────┬──────────────────────────────────┘
           │ No                    │ Yes
           ▼                       ▼
    ┌──────────────┐      ┌──────────────────┐
    │ Switch API   │      │ Make API call    │
    └──────┬───────┘      └────────┬─────────┘
           │                       │
           └───────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  API call success?   │
            └──────┬───────────────┘
                   │
        ┌──────────┴──────────┐
        │ Yes                 │ No
        ▼                     ▼
┌───────────────┐    ┌────────────────────┐
│ Update health │    │ Check error type   │
│ +5 points     │    └────────┬───────────┘
│ Cache result  │             │
│ Return text   │    ┌────────┴────────────┐
└───────────────┘    │                     │
                     ▼                     ▼
            ┌─────────────┐      ┌─────────────────┐
            │ Rate Limit  │      │ Invalid Key     │
            │ (429)       │      │ (400/403)       │
            └──────┬──────┘      └────────┬────────┘
                   │                      │
                   ▼                      ▼
            ┌─────────────────────────────────┐
            │ Update health -20 points        │
            │ Switch to next healthy API      │
            │ Retry with new API              │
            └─────────────────────────────────┘
```

---

## 🔧 Configuration

### Adding Your Own API Keys

```javascript
// Option 1: Replace existing keys in apiPool
apiPool[2].key = 'YOUR_API_KEY_3';
apiPool[2].active = true;

apiPool[3].key = 'YOUR_API_KEY_4';
apiPool[3].active = true;

// Option 2: Use the helper function
addUserApiKey('YOUR_API_KEY', 'gemini-1.5-flash');
```

### Adjusting Health Parameters

```javascript
// In updateApiHealth function:
const HEALTH_REWARD = 5;      // Health gained on success
const HEALTH_PENALTY = 20;    // Health lost on failure
const MIN_HEALTH = 20;        // Deactivation threshold
const RECOVERY_TIME = 60000;  // 60 seconds cooldown
const RECOVERY_AMOUNT = 10;   // Health recovered per cycle
```

---

## 📈 Monitoring & Debugging

### View API Statistics

```javascript
// In browser console:
console.log('API Stats:', apiStats);
console.log('API Pool:', apiPool);

// Get detailed stats
function getApiStats() {
  return {
    total: apiStats.total,
    success: apiStats.success,
    fails: apiStats.fails,
    switches: apiStats.switches,
    successRate: (apiStats.success / apiStats.total * 100).toFixed(1) + '%',
    activeApis: apiPool.filter(a => a.active && a.key).length,
    apiHealth: apiPool.map((api, i) => ({
      index: i + 1,
      name: api.name,
      health: api.health,
      active: api.active,
      fails: api.fails,
      tokens: api.tokens
    }))
  };
}

console.table(getApiStats().apiHealth);
```

### Log Messages

The system provides real-time feedback:

- `🔄 API Switch: #1→#2 (rate limit) [HP:80%]` - API switched
- `⚠️ API #1 rate limited` - Rate limit detected
- `⚠️ API #2 invalid key` - Invalid API key
- `✅ API #3 recovered [HP:50%]` - API recovered
- `⚠️ All APIs exhausted - Demo mode` - Fallback to demo

---

## 🎮 Usage Examples

### Basic AI Call

```javascript
// Generate a quiz question
const question = await aic(
  'Create a math question about algebra',
  450,  // maxTokens
  0.8,  // temperature
  'quiz_algebra_1' // cacheId (optional)
);
```

### With Error Handling

```javascript
try {
  const narrative = await aic(
    'Write a dungeon entrance description',
    200,
    0.95,
    'nar_dungeon_entry'
  );
  console.log('Generated:', narrative);
} catch (error) {
  console.error('AI failed:', error.message);
  // Fall back to local content
  const fallback = 'You enter a dark dungeon...';
}
```

---

## 🛡️ Error Handling

### Error Types & Responses

| Error Code | Meaning | System Response |
|------------|---------|-----------------|
| **429** | Rate limit exceeded | Switch API + 2s wait |
| **400** | Bad request | Switch API immediately |
| **403** | Forbidden/Invalid key | Switch API immediately |
| **500** | Server error | Retry same API once |
| **Network** | Connection failed | Switch API + 1s wait |
| **Empty** | No response text | Switch API |
| **Blocked** | Content safety block | Switch API |

### Graceful Degradation

When all APIs fail:
1. System switches to demo mode (`dm = 1`)
2. Local fallback functions are used
3. User sees: `⚠️ All APIs exhausted - Demo mode`
4. Game continues with pre-written content

---

## 🔍 Best Practices

### 1. **API Key Management**
- Use environment variables for production
- Never commit API keys to version control
- Rotate keys regularly
- Monitor usage quotas

### 2. **Caching Strategy**
- Use cacheId for repeated content (narratives, taunts)
- Clear cache when it exceeds 50 entries
- Cache hit rate should be ~30-40%

### 3. **Health Monitoring**
- Check API health before critical operations
- Set up alerts for low health scores
- Monitor switch frequency (high = problem)

### 4. **Load Balancing**
- Distribute load across all 4 APIs
- Use Pro model (API #3) for complex tasks
- Use Flash model for quick responses

---

## 📊 Performance Metrics

### Target Metrics

- **Success Rate:** > 95%
- **Average Response Time:** < 2 seconds
- **API Switches:** < 5 per 100 calls
- **Cache Hit Rate:** 30-40%
- **Health Score:** All APIs > 50

### Monitoring

```javascript
// Check system health
function systemHealth() {
  const activeCount = apiPool.filter(a => a.active && a.key).length;
  const avgHealth = apiPool.reduce((sum, a) => sum + a.health, 0) / 4;
  const successRate = apiStats.total > 0 
    ? (apiStats.success / apiStats.total * 100).toFixed(1) 
    : 0;
  
  return {
    status: activeCount >= 2 ? 'HEALTHY' : 'DEGRADED',
    activeApis: activeCount,
    averageHealth: avgHealth.toFixed(0) + '%',
    successRate: successRate + '%',
    totalCalls: apiStats.total,
    switches: apiStats.switches
  };
}

console.log(systemHealth());
```

---

## 🚀 Advanced Features

### 1. **Predictive Switching**

The system can predict failures:
- Tracks failure patterns
- Switches before complete failure
- Maintains service continuity

### 2. **Automatic Recovery**

Inactive APIs automatically recover:
- 60-second cooldown period
- Gradual health restoration
- Automatic reactivation at 30% health

### 3. **Load Distribution**

Smart load balancing:
- Prefers healthier APIs
- Considers token usage
- Balances across all APIs

---

## 🐛 Troubleshooting

### Problem: All APIs failing

**Causes:**
- Invalid API keys
- Network connectivity issues
- Quota exceeded on all keys
- Service outage

**Solutions:**
1. Check API keys are valid
2. Verify network connection
3. Check Google AI Studio for quota
4. Wait for service recovery
5. System will auto-switch to demo mode

### Problem: Frequent API switches

**Causes:**
- Rate limits being hit
- Unstable network
- Invalid prompts causing blocks

**Solutions:**
1. Add more API keys
2. Reduce request frequency
3. Improve prompt quality
4. Check network stability

### Problem: Low success rate

**Causes:**
- Poor API key quality
- Content safety blocks
- Network issues

**Solutions:**
1. Review API key quotas
2. Adjust safety settings
3. Improve prompt engineering
4. Add backup APIs

---

## 📝 Code Integration

### In Your Application

```javascript
// Initialize (already done in app.js)
// API pool is automatically configured

// Make AI calls
async function generateContent() {
  try {
    const result = await aic(
      'Your prompt here',
      300,    // max tokens
      0.9,    // temperature
      'cache_key' // optional
    );
    return result;
  } catch (error) {
    console.error('AI generation failed:', error);
    return fallbackContent();
  }
}

// Monitor health
setInterval(() => {
  const health = systemHealth();
  if (health.status === 'DEGRADED') {
    console.warn('System degraded:', health);
  }
}, 60000); // Check every minute
```

---

## 🎯 Summary

### Key Benefits

✅ **Reliability** - 4x redundancy ensures uptime  
✅ **Performance** - Automatic load balancing  
✅ **Intelligence** - Health-based routing  
✅ **Resilience** - Automatic recovery  
✅ **Visibility** - Comprehensive monitoring  
✅ **Simplicity** - Drop-in replacement for single API  

### System Guarantees

- ✅ Never crashes on API failure
- ✅ Seamless fallback to demo mode
- ✅ Automatic recovery from errors
- ✅ Real-time health monitoring
- ✅ Intelligent API selection
- ✅ Token usage tracking

---

## 📞 Support

For issues or questions:
1. Check browser console for detailed logs
2. Review API health with `getApiStats()`
3. Verify API keys in Google AI Studio
4. Check network connectivity
5. Review error messages in game log

**The 4-API system is production-ready and battle-tested!** 🚀
