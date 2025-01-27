// graphParser.js

/**
 * Parses graph text input into a structured graph object
 * @param {string} input - Graph input text
 * @returns {Object} Graph object with vertices and edges
 */
export const parseGraphFromText = (input) => {
    try {
      // Remove any whitespace and split by newlines
      const lines = input.trim().split('\n');
      const vertices = new Set();
      const edges = [];
      
      // Parse each line to extract edges
      lines.forEach(line => {
        const [source, target] = line.trim().split(/\s*->\s*|\s+/);
        if (source && target) {
          vertices.add(source);
          vertices.add(target);
          edges.push({ source, target });
        }
      });
  
      const graph = {
        vertices: Array.from(vertices),
        edges: edges,
        adjacencyList: createAdjacencyList(Array.from(vertices), edges)
      };
  
      return graph;
    } catch (error) {
      throw new Error('Invalid graph format. Please use format: "vertex1 -> vertex2" or "vertex1 vertex2"');
    }
  };
  
  /**
   * Creates an adjacency list representation of the graph
   * @param {Array} vertices - Array of vertex names
   * @param {Array} edges - Array of edge objects
   * @returns {Map} Adjacency list as a Map
   */
  const createAdjacencyList = (vertices, edges) => {
    const adjacencyList = new Map();
    
    // Initialize adjacency list for all vertices
    vertices.forEach(vertex => {
      adjacencyList.set(vertex, []);
    });
  
    // Add edges to adjacency list
    edges.forEach(({ source, target }) => {
      adjacencyList.get(source).push(target);
      // For undirected graphs, uncomment the following line:
      // adjacencyList.get(target).push(source);
    });
  
    return adjacencyList;
  };
  
  /**
   * Gets all neighbors of a vertex
   * @param {Object} graph - Graph object
   * @param {string} vertex - Vertex name
   * @returns {Array} Array of neighbor vertices
   */
  export const getNeighbors = (graph, vertex) => {
    return graph.adjacencyList.get(vertex) || [];
  };
  
  /**
   * Gets the degree of a vertex
   * @param {Object} graph - Graph object
   * @param {string} vertex - Vertex name
   * @returns {number} Degree of the vertex
   */
  export const getVertexDegree = (graph, vertex) => {
    return getNeighbors(graph, vertex).length;
  };