function updateThemeMetaColor(color) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color);
    }
}
/*Calculation stuff*/
function calculate() {
    const raw = document.getElementById("inputPriceIncrease").value;
    const inputPercent = parseFloat(document.getElementById("inputPercent").value) / 100 + 1;

    // Split input into array
    const parts = raw.trim().split(/\s+/);

    // Convert to numeric values (comma → dot)
    let nums = parts.map(x => parseFloat(x.replace(",", ".")));
    
    let n = {};
    nums.forEach((v, i) => n["n" + (i + 1)] = v);

    n.n2 = n.n2 * inputPercent;
    n.n3 = n.n3 * inputPercent;
    n.n4 = n.n4 * inputPercent;

    const sum = n.n1 + n.n2 + n.n3 + n.n4;

    // Replace number 8
    n.n8 = sum;

    // Convert back to array in correct order
    const resultArray = Object.keys(n)
        .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
		.map(key => formatNumber(n[key]));

    // Output
    document.getElementById("outputPriceIncrease").value = resultArray.join("\t");
}

function formatNumber(num) {
	let str = num.toFixed(3);
	str = str.replace(/0+$/, "");
	str = str.replace(/\.$/, "");
	return str.replace(".", ",");
}

function copyOutput() {
    const output = document.getElementById("outputPriceIncrease");
    output.select();
    output.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(output.value);
}

function resetNumbers(){
	document.getElementById("inputPriceIncrease").value = "";
	document.getElementById("inputPercent").value = 8;
	document.getElementById("outputPriceIncrease").value = "";
}

/*End Calculation stuff*/

document.addEventListener('DOMContentLoaded', () => {
	const themeSwitch = document.getElementById('theme-switch');
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('calculatorTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        themeSwitch.checked = false;
    } else {
    // No saved preference → follow OS preference
    if (prefersDark) {
        document.body.classList.remove('light-theme');
        themeSwitch.checked = false;
    } else {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    }
}
    // Theme toggle event
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('calculatorTheme', 'light');
            updateThemeMetaColor('#f8f9fa');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('calculatorTheme', 'dark');
            updateThemeMetaColor('#202124');
        }
    });
});
