/** @param {NS} ns */
export async function main(ns) {
	//copy execute.js file to target server
	ns.scp("execute.js", ns.args[0]);
	//to calulate max threads to run execute.js script 
	var threads = Math.floor(ns.getServerMaxRam(ns.args[0]) / ns.getScriptRam("execute.js", ns.args[0]));
	ns.tprint("threads = " + threads);

	// Brute if available to open port
	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(ns.args[0]);
	}
	if (ns.fileExists("FTPCrack.exe","home")){
		ns.ftpcrack(ns.args[0]);
	}
	if (ns.fileExists("relaySMTP.exe","home")){
		ns.relaysmtp(ns.args[0]);
	}
	if (ns.fileExists("HTTPWorm.exe","home")){
		ns.httpworm(ns.args[0]);
	}
	if (ns.fileExists("SQLInject.exe","home")){
		ns.sqlinject(ns.args[0]);
	}
	
	
	// Get root access to target server
	ns.nuke(ns.args[0]);
	//to kill other script if running
	ns.killall(ns.args[0]);
	//to execute scriptfile
	ns.exec("execute.js", ns.args[0], threads,threads);
}