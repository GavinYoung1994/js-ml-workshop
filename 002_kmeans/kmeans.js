
//Again, I'll start this off with the very beginning of the constructor function.
function KMeans(options){
	if (options == undefined){options = {};}
	this.minClusterMove = options.minClusterMove || 0.0001;
	this.clusterAttempts = 10;
	this.points = [];
}

KMeans.prototype.train = function() {

};

KMeans.prototype.clusters = function () {

};

KMeans.prototype._distance = function(vec1, vec2){
	var dist = [];
	for(var i = 0; i < vec1.length; i++){
		dist[i] = vec1[i] - vec2[i];
	}
	var sum = dist.reduce(function(a,b){
		return a += b * b;
	}, 0);
	return Math.sqrt(sum);
};

KMeans.prototype._max = function(array, func){
	var highest;
	for(var i = 0; i < array.length; i++){
		if(highest === undefined || func(array[highest], highest) < func(array[i], i)){
			highest = i;
		}
	}
	return array[highest];
}

KMeans.prototype._clusterEvaluator = function(centroids, testVecs){

	var distCalc = function(tVec, cVec){return -this._distance(cVec, tVec);};
	//returns the sum of the squares of distance from vecs to nearest centroids
	return testVecs.map(function(testVec){
		return this._distance(testVec, this._max(centroids, distCalc.bind(this, testVec)));
	}, this).reduce(function(a, b){
		return a += b * b;
	}, 0);

};

KMeans.prototype._averageLocation = function(vecs) {
	var totalVec = vecs[0].slice();
	for(var i = 1; i < vecs.length; i++){
		totalVec = vecs[i].map(function(dimension, index){
			return totalVec[index] + dimension;
		});
	}
	totalVec = totalVec.map(function(dimension){
		return dimension / vecs.length;
	});

	return totalVec;
};

KMeans.prototype._shiftCentroids = function(){
	
}




module.exports = KMeans