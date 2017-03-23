
//////////////////////////////////////////////////////////////////////////////
// M is an object containing methods that let you manipulate 4x4 matrices.
//////////////////////////////////////////////////////////////////////////////

var M = {};
M._stack = [];

//////////////////////////////////////////////////////////////////////////////
// Your task is to implement the following methods of object M:
//////////////////////////////////////////////////////////////////////////////

M.identity  = function(m)   {
	for (var i = 0; i < 16; i++) {
		if (i == 0 || i == 5 || i == 10 || i ==15) {
			m[i] = 1;
		}
		else {
			m[i] = 0;
		}
	}
	//have to set each index??
	//m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	//console.log("set to identity: " + m);
} // Set m values to identity matrix.

//given in class
M.restore = function(m) {
	var i, _m = M._stack.pop();
	for (i = 0; i < m.length; i++) {
		m[i] = _m[i];
	}
	//console.log("restore happened, _stack len now: " + M._stack.length);
} // Pop from a stack to set the 16 values of m.

M.xMatrix = function (radians) {
	var id = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	id[5] = Math.cos(radians);
	id[6] = -1*Math.sin(radians);
	id[9] = Math.sin(radians);
	id[10] = Math.cos(radians);
	return id;
}

M.yMatrix = function (radians) {
	var id = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	id[0] = Math.cos(radians);
	id[2] = Math.sin(radians);
	id[8] = -1*Math.sin(radians);
	id[10] = Math.cos(radians);
	return id;
}

M.zMatrix = function (radians) {
	var id = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	id[0]  = Math.cos(radians);
	id[1]  = -1*Math.sin(radians);
	id[4]  = Math.sin(radians);
	id[5]  = Math.cos(radians);
	return id;
}

M.rotateX = function(m, radians) {
	//console.log("before rotX, m was: " + m);
	M.matrixMultiply(m, M.xMatrix(radians), m);
	//console.log("rotate x, m now: " + m);	
} // Modify m, rotating about the X axis.

M.rotateY = function(m, radians) {
	//console.log("before rotY, m was: " + m);
	M.matrixMultiply(m, M.yMatrix(radians), m);
	//console.log("rotated y, m now: " + m);
} // Modify m, rotating about the Y axis.

M.rotateZ = function(m, radians) {
	M.matrixMultiply(m, M.zMatrix(radians), m);
	//console.log("rotate z, m now: " + m);
} // Modify m, rotating about the Z axis.

//given in class
M.save = function(m) {
	var i, _m = [];
	for (i = 0; i < m.length; i++) {
		_m.push(m[i]);
	}
	M._stack.push(_m);
	//console.log("a save happens, _stack now: " + M._stack.length);
} // Push the 16 values of m onto a stack.

M.sMatrix = function(v) {
	/*
	console.log("creating sMatrix");
	var id = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
	var x, y, z;
	if (v instanceOf Array) {//=> M is not found??? 
		x = v[0];
		y = v[1];
		z = v[2];
	}
	else {
		x = y = z = v;
	//}
	id[0] = x;
	id[5] = y;
	id[10] = z;
	console.log("x: " + x + " y: " + y + " z: " + z);
	return id;
	*/	
	return [v,0,0,0, 0,v,0,0, 0,0,v,0, 0,0,0,1];

}

M.scale = function(m, v) {
	//console.log("before scaling, m was: " + m);
	//console.log("v: " + v);
	M.matrixMultiply(m, M.sMatrix(v), m);
	//console.log("scaling happened, m now: " + m);//*/
} // Modify m, scaling by v[0],v[1],v[2].

/* ********** BELOW ************
M.transform = function(m, v) {return m;} // Return vec v transformed by matrix m.

M.translate = function(m, v) {	} // Modify m, translating by v[0],v[1],v[2].
*/

//////////////////////////////////////////////////////////////////////////////
// I have given you a head start by implementing some of the methods for you.
//
// Notice how I use M.matrixMultiply() to help implement other methods.
//////////////////////////////////////////////////////////////////////////////

M.translate = function(m, v) {
   M.matrixMultiply(m, M.translationMatrix(v), m);
}

M.translationMatrix = function(v) {
   return [ 1,0,0,0, 0,1,0,0, 0,0,1,0, v[0],v[1],v[2],1 ];
}

M.matrixMultiply = function(a, b, dst) {
   var n, tmp = []; 

   // PUT THE RESULT OF a x b INTO TEMPORARY MATRIX tmp.

   for (n = 0 ; n < 16 ; n++)
      tmp.push( a[n&3     ] * b[    n&12] +
                a[n&3 |  4] * b[1 | n&12] +
                a[n&3 |  8] * b[2 | n&12] +
                a[n&3 | 12] * b[3 | n&12] );

   // COPY tmp VALUES INTO DESTINATION MATRIX dst.

   for (n = 0 ; n < 16 ; n++)
      dst[n] = tmp[n];
}

M.transform = function(m, v)  {

    // IF v[3] IS UNDEFINED, SET IT TO 1 (THAT IS, ASSUME v IS A POINT).

    var x = v[0], y = v[1], z = v[2], w = v[3] === undefined ? 1 : v[3];

    // RETURN RESULT OF TRANSFORMING v BY MATRIX m.

    return [ x * m[0] + y * m[4] + z * m[ 8] + w * m[12],
             x * m[1] + y * m[5] + z * m[ 9] + w * m[13],
             x * m[2] + y * m[6] + z * m[10] + w * m[14],
             x * m[3] + y * m[7] + z * m[11] + w * m[15] ];
}

