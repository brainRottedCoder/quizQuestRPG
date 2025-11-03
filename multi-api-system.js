// QuizQuest RPG - 4-API Fallback System with Health Monitoring
// This system intelligently manages 4 API keys with automatic fallback

// 4-API Pool Configuration
const apiPool = [
  {
    key: 'AIzaSyA2P-t0D40ZIfFUHZehe_A2iSVVnZ81xN0',
    model: 'gemini-1.5-flash',
    health: 100,
    fails: 0,
    tokens: 0,
    lastFail: 0,
    active: true,
    name: 'Primary Flash'
  },
  {
    key: 'AIzaSyABi1_774N7dbhV8MljNIjAMVxqnnL_MxU',
    model: 'gemini-1.5-flash',
    health: 100,
    fails: 0,
    tokens: 0,
    lastFail: 0,
    active: true,
    name: 'Secondary Flash'
  },
  {
    key: '', // User can add their own
    model: 'gemini-1.5-pro',
    health: 100,
    fails: 0,
    tokens: 0,
    lastFail: 0,
    active: false,
    name: 'Pro Model'
  },
  {
    key: '', // User can add their own
    model: 'gemini-1.5-flash',
    health: 100,
    fails: 0,
    tokens: 0,
    lastFail: 0,
    active: false,
    name: 'Tertiary Flash'
  }
];

let currentApiIndex = 0;
const apiStats = {
  total: 0,
  success: 0,
  fails: 0,
  switches: 0,
  startTime: Date.now()
};

// Get the healthiest available API
function getHealthyApi() {
  const activeApis = apiPool.filter(api => 
    api.active && 
    api.key && 
    api.health > 20
  );
  
  if (activeApis.length === 0) return null;
  
  // Sort by health (descending), then tokens used (ascending), then fails (ascending)
  activeApis.sort((a, b) => {
    if (b.health !== a.health) return b.health - a.health;
    if (a.tokens !== b.tokens) return a.tokens - b.tokens;
    return a.fails - b.fails;
  });
  
  return activeApis[0];
}

// Switch to next healthy API
function switchApi(reason = '') {
  const previousIndex = currentApiIndex;
  const nextApi = getHealthyApi();
  
  if (!nextApi) {
    console.warn('All APIs exhausted');
    return false;
  }
  
  currentApiIndex = apiPool.indexOf(nextApi);
  apiStats.switches++;
  
  console.log(`API Switch: #${previousIndex + 1} → #${currentApiIndex + 1}`, {
    reason,
    health: nextApi.health,
    name: nextApi.name
  });
  
  return true;
}

// Update API health based on success/failure
function updateApiHealth(index, success, tokensUsed = 0) {
  const api = apiPool[index];
  
  if (success) {
    // Reward success
    api.health = Math.min(100, api.health + 5);
    api.fails = Math.max(0, api.fails - 1);
    api.tokens += tokensUsed;
    apiStats.success++;
  } else {
    // Penalize failure
    api.health = Math.max(0, api.health - 20);
    api.fails++;
    api.lastFail = Date.now();
    apiStats.fails++;
    
    // Deactivate if health too low
    if (api.health < 20) {
      api.active = false;
      console.warn(`API #${index + 1} (${api.name}) deactivated - low health`);
    }
  }
}

// Recover APIs that have been inactive for a while
function recoverApis() {
  const now = Date.now();
  const recoveryTime = 60000; // 1 minute
  
  apiPool.forEach((api, index) => {
    if (!api.active && api.key && (now - api.lastFail) > recoveryTime) {
      // Gradually recover health
      api.health = Math.min(100, api.health + 10);
      
      // Reactivate if health is sufficient
      if (api.health >= 30) {
        api.active = true;
        console.log(`API #${index + 1} (${api.name}) recovered - Health: ${api.health}%`);
      }
    }
  });
}

// Main AI Call Function with 4-API Fallback
async function callAI(instruction, maxTokens = 300, temperature = 0.9, cacheId = '') {
  // Check for demo mode
  if (window.demoMode) {
    throw new Error('Demo mode active');
  }
  
  // Check cache first
  if (cacheId && window.aiCache && window.aiCache.has(cacheId)) {
    console.log('Cache hit:', cacheId);
    return window.aiCache.get(cacheId);
  }
  
  // Try to recover any APIs
  recoverApis();
  
  // Count active APIs
  const activeApiCount = apiPool.filter(api => api.active && api.key).length;
  
  if (activeApiCount === 0) {
    console.error('No API keys available');
    throw new Error('No API keys configured');
  }
  
  let attempts = 0;
  const maxAttempts = activeApiCount;
  
  while (attempts < maxAttempts) {
    const api = apiPool[currentApiIndex];
    
    // Skip if API is not active or has no key
    if (!api.active || !api.key) {
      if (!switchApi('inactive')) {
        throw new Error('All APIs unavailable');
      }
      continue;
    }
    
    apiStats.total++;
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${api.model}:generateContent?key=${api.key}`;
    
    const requestBody = {
      contents: [{
        parts: [{ text: instruction }]
      }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: temperature,
        topP: 0.95,
        topK: 40
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
      ]
    };
    
    try {
      console.log(`API Call #${currentApiIndex + 1} (${api.name}):`, {
        model: api.model,
        health: api.health,
        tokens: maxTokens
      });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API #${currentApiIndex + 1} error:`, response.status, errorText.substring(0, 200));
        
        // Rate limit (429)
        if (response.status === 429) {
          updateApiHealth(currentApiIndex, false);
          console.warn(`API #${currentApiIndex + 1} rate limited`);
          
          if (!switchApi('rate limit')) {
            throw new Error('All APIs rate limited');
          }
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          attempts++;
          continue;
        }
        
        // Invalid key (400, 403)
        if (response.status === 400 || response.status === 403) {
          updateApiHealth(currentApiIndex, false);
          console.warn(`API #${currentApiIndex + 1} invalid key`);
          
          if (!switchApi('invalid key')) {
            throw new Error('All API keys invalid');
          }
          
          attempts++;
          continue;
        }
        
        // Other errors
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse response
      const jsonResponse = await response.json();
      
      // Check for candidates
      if (!jsonResponse.candidates || !jsonResponse.candidates[0]) {
        // Check for content blocking
        if (jsonResponse.promptFeedback?.blockReason) {
          updateApiHealth(currentApiIndex, false);
          console.warn(`Content blocked by API #${currentApiIndex + 1}:`, jsonResponse.promptFeedback.blockReason);
          
          if (!switchApi('content blocked')) {
            throw new Error('Content blocked by all APIs');
          }
          
          attempts++;
          continue;
        }
        
        throw new Error('No response from API');
      }
      
      const candidate = jsonResponse.candidates[0];
      
      // Check finish reason
      if (candidate.finishReason && 
          candidate.finishReason !== 'STOP' && 
          candidate.finishReason !== 'MAX_TOKENS') {
        updateApiHealth(currentApiIndex, false);
        console.warn(`API #${currentApiIndex + 1} finish reason:`, candidate.finishReason);
        
        if (!switchApi(candidate.finishReason)) {
          throw new Error(`API issue: ${candidate.finishReason}`);
        }
        
        attempts++;
        continue;
      }
      
      // Extract text
      const text = candidate.content?.parts?.[0]?.text || '';
      
      if (!text.trim()) {
        throw new Error('Empty response from API');
      }
      
      // Success!
      updateApiHealth(currentApiIndex, true, maxTokens);
      
      // Cache the result
      if (cacheId && window.aiCache) {
        window.aiCache.set(cacheId, text);
        
        // Limit cache size
        if (window.aiCache.size > 50) {
          const firstKey = window.aiCache.keys().next().value;
          window.aiCache.delete(firstKey);
        }
      }
      
      console.log(`API #${currentApiIndex + 1} success:`, {
        length: text.length,
        health: api.health
      });
      
      return text;
      
    } catch (error) {
      // Network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        updateApiHealth(currentApiIndex, false);
        console.error(`Network error on API #${currentApiIndex + 1}:`, error.message);
        
        if (!switchApi('network error')) {
          throw new Error('Network error on all APIs');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        continue;
      }
      
      // Other errors - rethrow
      throw error;
    }
  }
  
  throw new Error('All API attempts exhausted');
}

// Get API statistics
function getApiStats() {
  const uptime = Date.now() - apiStats.startTime;
  const successRate = apiStats.total > 0 ? (apiStats.success / apiStats.total * 100).toFixed(1) : 0;
  
  return {
    ...apiStats,
    uptime: Math.floor(uptime / 1000),
    successRate: successRate + '%',
    activeApis: apiPool.filter(api => api.active && api.key).length,
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

// Add user API key
function addUserApiKey(key, modelType = 'gemini-1.5-flash') {
  // Find first empty slot
  const emptySlot = apiPool.find(api => !api.key);
  
  if (!emptySlot) {
    console.warn('All API slots full');
    return false;
  }
  
  emptySlot.key = key;
  emptySlot.model = modelType;
  emptySlot.active = true;
  emptySlot.health = 100;
  
  console.log('API key added:', emptySlot.name);
  return true;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    callAI,
    getApiStats,
    addUserApiKey,
    apiPool,
    switchApi,
    recoverApis
  };
}

// Make available globally
window.MultiApiSystem = {
  callAI,
  getApiStats,
  addUserApiKey,
  apiPool,
  switchApi,
  recoverApis
};

console.log('🔧 Multi-API System initialized with', apiPool.filter(a => a.key).length, 'active keys');
