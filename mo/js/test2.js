
ERR_REPORT.init({
	user: 'mingyi.ymy'
});

var tst = 1;

// console.info(vtest);

try {
	console.asges(tst);
} catch(e) {
	ERR_REPORT.report(e);
}