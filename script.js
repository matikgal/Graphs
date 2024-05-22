function generateGraph() {
	var vertices = parseInt(document.getElementById('vertices').value)
	var probability = parseFloat(document.getElementById('probability').value)
	var degree = parseInt(document.getElementById('degree').value)

	var nodes = new vis.DataSet()
	var edges = []

	// Dodaj wierzchołki
	for (var i = 0; i < vertices; i++) {
		nodes.add({ id: i, label: String(i) })
	}

	// Stwórz tablicę do śledzenia stopnia wierzchołków
	var vertexDegree = new Array(vertices).fill(0)

	// Faza 1: Połącz dwa pierwsze wierzchołki
	edges.push({ from: 0, to: 1 })
	vertexDegree[0]++
	vertexDegree[1]++

	// Faza 2: Dalsze krawędzie
	for (var i = 2; i < vertices - 1; i++) {
		var to = Math.floor(Math.random() * i) // Losowo wybierz wierzchołek mniejszy niż obecny
		if (vertexDegree[to] < degree && vertexDegree[i] < degree) {
			edges.push({ from: i, to: to })
			vertexDegree[to]++
			vertexDegree[i]++
		}
	}

	// Faza 3: Przyłącz ostatni wierzchołek do losowego wierzchołka
	var lastVertex = vertices - 1
	var to = Math.floor(Math.random() * lastVertex)
	if (vertexDegree[to] < degree && vertexDegree[lastVertex] < degree) {
		edges.push({ from: lastVertex, to: to })
		vertexDegree[to]++
		vertexDegree[lastVertex]++
	}

	// Stwórz dane grafu
	var networkData = {
		nodes: nodes,
		edges: edges,
	}

	// Konfiguruj opcje sieci
	var container = document.getElementById('mynetwork')
	var options = {}
	var network = new vis.Network(container, networkData, options)

	// Generuj i wyświetl macierz sąsiedztwa
	var adjacencyMatrixHTML = '<h3>Macierz sąsiedztwa:</h3><table>'
	for (var i = 0; i < vertices; i++) {
		adjacencyMatrixHTML += '<tr>'
		for (var j = 0; j < vertices; j++) {
			var isAdjacent = false
			edges.forEach(function (edge) {
				if ((edge.from === i && edge.to === j) || (edge.from === j && edge.to === i)) {
					isAdjacent = true
				}
			})
			adjacencyMatrixHTML += '<td>' + (isAdjacent ? 1 : 0) + '</td>'
		}
		adjacencyMatrixHTML += '</tr>'
	}
	adjacencyMatrixHTML += '</table>'
	document.getElementById('adjacencyMatrix').innerHTML = adjacencyMatrixHTML

	// Wygeneruj i wyświetl ciąg stopni
	var degreeSequenceHTML = '<h3>Ciąg stopni:</h3>'
	for (var i = 0; i < vertices; i++) {
		degreeSequenceHTML += vertexDegree[i] + ' '
	}
	document.getElementById('degreeSequence').innerHTML = degreeSequenceHTML

	// Wygeneruj i wyświetl zbiór krawędzi
	var edgeSetHTML = '<h3>Zbiór krawędzi:</h3><ul>'
	edges.forEach(function (edge) {
		edgeSetHTML += '<li>' + edge.from + ' - ' + edge.to + '</li>'
	})
	edgeSetHTML += '</ul>'
	document.getElementById('edgeSet').innerHTML = edgeSetHTML
}
