function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function generateGraph() {
	var vertices = parseInt(document.getElementById('vertices').value);
	var degreeLimit = parseInt(document.getElementById('degree').value);
  
	if (vertices < 2) {
	  alert("Potrzebne są co najmniej dwa wierzchołki do stworzenia drzewa.");
	  return;
	}
  
	var nodes = new vis.DataSet();
	var edges = [];
	var vertexDegree = new Array(vertices).fill(0);
  
	// Dodaj wierzchołki
	for (var i = 0; i < vertices; i++) {
	  nodes.add({ id: i, label: String(i) });
	}
  
	// Faza 1: Dodanie pierwszej krawędzi
	var treeVertices = new Set();
	var remainingVertices = new Set();
	for (var i = 0; i < vertices; i++) {
	  remainingVertices.add(i);
	}
  
	var vertex1 = getRandomElement(Array.from(remainingVertices));
	remainingVertices.delete(vertex1);
	var vertex2 = getRandomElement(Array.from(remainingVertices));
	remainingVertices.delete(vertex2);
  
	edges.push({ from: vertex1, to: vertex2 });
	treeVertices.add(vertex1);
	treeVertices.add(vertex2);
	vertexDegree[vertex1]++;
	vertexDegree[vertex2]++;
  
	// Faza 2: Dodanie n-3 krawędzi
	while (remainingVertices.size > 1) {
	  var newVertex = getRandomElement(Array.from(remainingVertices));
	  remainingVertices.delete(newVertex);
  
	  var possibleConnections = Array.from(treeVertices).filter(v => vertexDegree[v] < degreeLimit);
	  if (possibleConnections.length === 0) {
		alert("Nie można dodać więcej krawędzi zgodnie z ograniczeniem stopnia wierzchołków.");
		return;
	  }
  
	  var connectedVertex = getRandomElement(possibleConnections);
	  edges.push({ from: newVertex, to: connectedVertex });
	  treeVertices.add(newVertex);
	  vertexDegree[newVertex]++;
	  vertexDegree[connectedVertex]++;
	}
  
	// Faza 3: Przyłączenie ostatniego wierzchołka
	var lastVertex = Array.from(remainingVertices)[0];
	var possibleConnections = Array.from(treeVertices).filter(v => vertexDegree[v] < degreeLimit);
	if (possibleConnections.length === 0) {
	  alert("Nie można dodać więcej krawędzi zgodnie z ograniczeniem stopnia wierzchołków.");
	  return;
	}
  
	var connectedVertex = getRandomElement(possibleConnections);
	edges.push({ from: lastVertex, to: connectedVertex });
	treeVertices.add(lastVertex);
	vertexDegree[lastVertex]++;
	vertexDegree[connectedVertex]++;
  
	// Stwórz dane grafu
	var networkData = {
	  nodes: nodes,
	  edges: edges,
	};
  
	// Konfiguruj opcje sieci
	var container = document.getElementById('mynetwork');
	var options = {};
	var network = new vis.Network(container, networkData, options);
  
	// Generuj i wyświetl macierz sąsiedztwa
	var adjacencyMatrixHTML = '<h3>Macierz sąsiedztwa:</h3><table>';
	for (var i = 0; i < vertices; i++) {
	  adjacencyMatrixHTML += '<tr>';
	  for (var j = 0; j < vertices; j++) {
		var isAdjacent = false;
		edges.forEach(function (edge) {
		  if ((edge.from === i && edge.to === j) || (edge.from === j && edge.to === i)) {
			isAdjacent = true;
		  }
		});
		adjacencyMatrixHTML += '<td>' + (isAdjacent ? 1 : 0) + '</td>';
	  }
	  adjacencyMatrixHTML += '</tr>';
	}
	adjacencyMatrixHTML += '</table>';
	document.getElementById('adjacencyMatrix').innerHTML = adjacencyMatrixHTML;
  
	// Wygeneruj i wyświetl ciąg stopni
	var degreeSequenceHTML = '<h3>Ciąg stopni:</h3>';
	for (var i = 0; i < vertices; i++) {
	  degreeSequenceHTML += vertexDegree[i] + ' ';
	}
	document.getElementById('degreeSequence').innerHTML = degreeSequenceHTML;
  
	// Wygeneruj i wyświetl zbiór krawędzi
	var edgeSetHTML = '<h3>Zbiór krawędzi:</h3><ul>';
	edges.forEach(function (edge) {
	  edgeSetHTML += '<li>' + edge.from + ' - ' + edge.to + '</li>';
	});
	edgeSetHTML += '</ul>';
	document.getElementById('edgeSet').innerHTML = edgeSetHTML;
  }
  