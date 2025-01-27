
// algorithms.js

const state = {
    core_1: new Map(),
    core_2: new Map(),
    in_1: new Map(),
    in_2: new Map(),
    out_1: new Map(),
    out_2: new Map()
  };
  
  /**
   * Checks if two graphs are isomorphic using the VF2 algorithm
   * @param {Object} graph1 - First graph object
   * @param {Object} graph2 - Second graph object
   * @returns {boolean} True if graphs are isomorphic
   */
  export const checkIsomorphismVF2 = (graph1, graph2) => {
    // Quick check for different number of vertices or edges
    if (graph1.vertices.length !== graph2.vertices.length || 
        graph1.edges.length !== graph2.edges.length) {
      return false;
    }
  
    // Initialize state
    initializeState(graph1, graph2);
    
    // Start matching from empty state
    return matchVF2(graph1, graph2, 0);
  };
  
  const initializeState = (graph1, graph2) => {
    // Reset all mappings
    state.core_1.clear();
    state.core_2.clear();
    state.in_1.clear();
    state.in_2.clear();
    state.out_1.clear();
    state.out_2.clear();
  
    // Initialize vertex sets
    graph1.vertices.forEach(v => {
      state.core_1.set(v, null);
      state.in_1.set(v, false);
      state.out_1.set(v, false);
    });
  
    graph2.vertices.forEach(v => {
      state.core_2.set(v, null);
      state.in_2.set(v, false);
      state.out_2.set(v, false);
    });
  };
  
  const matchVF2 = (graph1, graph2, depth) => {
    if (depth === graph1.vertices.length) {
      return true; // All vertices have been matched
    }
  
    // Get next pair of vertices to match
    const candidatePairs = getCandidatePairs(graph1, graph2);
    
    for (const [v1, v2] of candidatePairs) {
      if (isFeasible(graph1, graph2, v1, v2)) {
        // Add pair to mapping
        addPairToMapping(v1, v2);
        
        if (matchVF2(graph1, graph2, depth + 1)) {
          return true;
        }
        
        // If matching fails, backtrack
        removePairFromMapping(v1, v2);
      }
    }
  
    return false;
  };
  
  const getCandidatePairs = (graph1, graph2) => {
    const pairs = [];
    
    // Find first unmapped vertex in graph1
    for (const v1 of graph1.vertices) {
      if (!state.core_1.get(v1)) {
        for (const v2 of graph2.vertices) {
          if (!state.core_2.get(v2)) {
            pairs.push([v1, v2]);
          }
        }
        break;
      }
    }
  
    return pairs;
  };
  
  const isFeasible = (graph1, graph2, v1, v2) => {
    // Check vertex degrees
    if (graph1.adjacencyList.get(v1).length !== graph2.adjacencyList.get(v2).length) {
      return false;
    }
  
    // Check connectivity with already matched vertices
    for (const [mappedV1, mappedV2] of state.core_1.entries()) {
      if (mappedV2) {
        const hasEdge1 = graph1.adjacencyList.get(v1).includes(mappedV1);
        const hasEdge2 = graph2.adjacencyList.get(v2).includes(mappedV2);
        if (hasEdge1 !== hasEdge2) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  const addPairToMapping = (v1, v2) => {
    state.core_1.set(v1, v2);
    state.core_2.set(v2, v1);
    updateInOut(v1, v2, true);
  };
  
  const removePairFromMapping = (v1, v2) => {
    state.core_1.set(v1, null);
    state.core_2.set(v2, null);
    updateInOut(v1, v2, false);
  };
  
  const updateInOut = (v1, v2, addPair) => {
    const value = addPair;
    state.in_1.set(v1, value);
    state.in_2.set(v2, value);
    state.out_1.set(v1, value);
    state.out_2.set(v2, value);
  };
  
  /**
   * Checks if two graphs are isomorphic using the VF algorithm
   * @param {Object} graph1 - First graph object
   * @param {Object} graph2 - Second graph object
   * @returns {boolean} True if graphs are isomorphic
   */
  export const checkIsomorphismVF = (graph1, graph2) => {
    if (graph1.vertices.length !== graph2.vertices.length || 
        graph1.edges.length !== graph2.edges.length) {
      return false;
    }
  
    const mapping = new Map();
    return matchVF(graph1, graph2, mapping);
  };
  
  const matchVF = (graph1, graph2, mapping) => {
    if (mapping.size === graph1.vertices.length) {
      return true;
    }
  
    const unmappedV1 = graph1.vertices.find(v => !mapping.has(v));
    
    for (const v2 of graph2.vertices) {
      if (!Array.from(mapping.values()).includes(v2)) {
        if (isCompatible(graph1, graph2, unmappedV1, v2, mapping)) {
          mapping.set(unmappedV1, v2);
          
          if (matchVF(graph1, graph2, mapping)) {
            return true;
          }
          
          mapping.delete(unmappedV1);
        }
      }
    }
  
    return false;
  };
  
  const isCompatible = (graph1, graph2, v1, v2, mapping) => {
    const neighbors1 = graph1.adjacencyList.get(v1);
    const neighbors2 = graph2.adjacencyList.get(v2);
  
    if (neighbors1.length !== neighbors2.length) {
      return false;
    }
  
    for (const [mappedV1, mappedV2] of mapping.entries()) {
      const hasEdge1 = neighbors1.includes(mappedV1);
      const hasEdge2 = neighbors2.includes(mappedV2);
      if (hasEdge1 !== hasEdge2) {
        return false;
      }
    }
  
    return true;
  };