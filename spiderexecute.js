/** @param {NS} ns */
export async function main(ns) {
	const target = "home";
	var list = ["home"];
	let neighbor = ns.scan(target);
	//to get base node connected with home
	for (let n in neighbor) {
		if (!list.includes(neighbor[n])) {
			list.push(neighbor[n]);
		}
	}
	//ns.tprint(list); to debug
	//to iterate the base nodes connect to home and after fetching new node iterate them too and add to list
	let flag = list.length;
	let count = 0;
	//flag-1 coz we need index not length as we use count as index increment
	while ((flag - 1) >= count) {
		//for reducing un-necessary loop
		let x = count;
		//x coz direct use of count may increment for-loop in first iteration (incremented count only use after for loop end)
		for (let i = 0 + x; i <= flag; i++) {
			count++;
			//server list is required as there may be many node connect to one node
			let server = ns.scan(list[i]);
			for (let n in server) {
				//if condition ony push element which is not in list
				if (!list.includes(server[n])) {
					list.push(server[n]);
				}
			}
		}
		//As we push element in list list-size is to increase for further operation and count only iterate for new element
		flag = list.length;
	}
	//removing home from list
	list.splice(0, 1);

	for (let n in list) {

		ns.tprint(list[n] + "\n");
		ns.tprint(ns.getServerRequiredHackingLevel(list[n]) + "\n");
		ns.tprint(ns.getHackingLevel());
		//check for hackable server
		if (ns.getServerRequiredHackingLevel(list[n]) <= ns.getHackingLevel()) {
			ns.tprint(list[n] + "\n");
			ns.tprint("true");
			//run process script for that server
			ns.exec("process.js", 'home', 1, list[n]);

		}

	}
}