//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(array){
	this.points = this.points.concat(array);
};

KNN.prototype._distance = function(vec1, vec2){
	var dist = [];
	for(var i = 0; i < vec1.length; i++){
		dist[i] = vec1[i] - vec2[i];
	}
	var sum = dist.reduce(function(a,b){
		return a += b * b;
	}, 0);
	return Math.sqrt(sum);
};

KNN.prototype._distances = function(newVec, testVecs){
	return testVecs.map(function(testVec){
		return [this._distance(newVec, testVec[0]), testVec[1]];
	}, this);
};

KNN.prototype._sorted = function(vecs){
	return vecs.sort(function(a,b){
		return a[0] - b[0];
	}).map(function(vec){
		return vec[1];
	});
};

KNN.prototype._majority = function (k, vals){
	var kVals = vals.slice(0, k);
	var occurences = {};
	var maxVal, val;
	for(var i = 0; i < kVals.length; i++){
		val = kVals[i];
		if(!occurences[val]){
			occurences[val] = 1;
		}else{
			occurences[val] += 1;
		}
		if(!occurences[maxVal] || occurences[val] > occurences[maxVal]){
			maxVal = val;
		}
	}
	return maxVal;
}

KNN.prototype.predictSingle = function (vec){
	return this._majority(this.kSize, this._sorted(this._distances(vec, this.points)));

}

KNN.prototype.predict = function (vecs){
	return vecs.map(function(vec){
		return this.predictSingle(vec);
	}, this);
};

KNN.prototype.score = function (vecs){
	var hits = this.predict(vecs.map(function(vec){
		return vec[0];
	}));
	var correct = hits.filter(function(val, index){
		return val === vecs[index][1];
	});
	return correct.length / hits.length;
};

module.exports = KNN