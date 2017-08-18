function nested_sum_AB_test(mode) {
	var gpu = new GPU({ mode: mode });
	
	var f = gpu.createKernel(function(a, b) {
		function custom_adder(a,b) {
			return a+b;
		}
		
		return custom_adder(a[this.thread.x], b[this.thread.x]);
	}, {
    output : [6]
	});
	
	QUnit.assert.ok(f !== null, "function generated test");
	
	var a = [1, 2, 3, 5, 6, 7];
	var b = [4, 5, 6, 1, 2, 3];
	
	var res = f(a,b);
	var exp = [5, 7, 9, 6, 8, 10];
	
	for(var i = 0; i < exp.length; ++i) {
		QUnit.assert.close(res[i], exp[i], 0.1, "Result arr idx: "+i);
	}
}
//
// QUnit.test( "nested_sum (auto)", function() {
// 	nested_sum_AB_test(null);
// });
//
// QUnit.test( "nested_sum (WebGL)", function() {
// 	nested_sum_AB_test("webgl");
// });

QUnit.test( "nested_sum (CPU)", function() {
	nested_sum_AB_test("cpu");
});
