Hooks.once("init", function() {
    console.log("Incializando módulo Eterno Azul")

    game.settings.register("eterno-azul-csb", "firstTimeStart", {
        name: "Forzar mensaje de Bienvenida",
        hint: "Si marcas esta casilla te aparecerá el mensaje de bienvenida en el chat la próxima vez que entres.",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    })
})

Hooks.once("ready", function() {
	let forzarbienvenida=game.settings.get("eterno-azul-csb", "firstTimeStart");
	let forzarmensaje;
	console.log(forzarmensaje);
	if (forzarbienvenida==true) {
		forzarmensaje=true;
	}
	let versactual=game.modules.get("eterno-azul-csb").version;
	let userisGM=game.user.isGM;
	if (userisGM) {
		if(!game.user.getFlag("eterno-azul-csb", "welcomeMessage") || forzarmensaje==true) {
			console.log('lalala');
			let buttonId=Date.now();
			let buttonId2=Date.now()+2;
			let msg='<h1>Bienvenido al módulo de Eterno Azul</h1><p>Importa los compendios para poder empezar a usar el módulo</p><button id='+buttonId2+' >Importa los compendios</button><button id='+buttonId+' >Ve al Tutorial</button>';
			ChatMessage.create({
        		speaker: {alias:"Eterno Azul"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/eterno-azul-csb')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("eterno-azul-csb.itemtemplates");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates Objetos")) {
							folderident=game.folders.getName("Templates Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("eterno-azul-csb.actortemplates");
							let folderident2=''
							if (game.folders.getName("Templates Actores")) {
								folderident2=game.folders.getName("Templates Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
						}, 500);
						game.user.setFlag("eterno-azul-csb", "welcomeMessage", true);
						game.user.setFlag("eterno-azul-csb", "lastVersion", game.modules.get("eterno-azul-csb").version);
					});
				}
				}, 100);
			});
			game.settings.set("eterno-azul-csb", "firstTimeStart", false);
		} else if (versactual!=game.user.getFlag("eterno-azul-csb", "lastVersion")) {
			let buttonId=Date.now();
			let buttonId2=Date.now()+2;
			let msg='<h1>Bienvenido al módulo de Eterno Azul</h1><p>Se ha actualizado el módulo desde la última vez que lo usaste. Importa los compendios para tener la última versión de las Templates de actores y objetos.</p><button id='+buttonId2+' >Importa los compendios</button><button id='+buttonId+' >Ve al Tutorial</button>';
			ChatMessage.create({
					speaker: {alias:"Eterno Azul"},
					content: msg,
			   whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/eterno-azul-csb')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("eterno-azul-csb.itemtemplates");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates Objetos")) {
							folderident=game.folders.getName("Templates Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("eterno-azul-csb.actortemplates");
							let folderident2=''
							if (game.folders.getName("Templates Actores")) {
								folderident2=game.folders.getName("Templates Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
						}, 500);
						game.user.setFlag("eterno-azul-csb", "welcomeMessage", true);
						game.user.setFlag("eterno-azul-csb", "lastVersion", game.modules.get("eterno-azul-csb").version);
					});
				}
				}, 500);
			});
      game.settings.set("custom-system-builder", "initFormula", "isnpc==1 ? iniciativa:iniciativa+0.01");
		}
	} else if (!game.user.getFlag("eterno-azul-csb", "welcomeMessage") || forzarmensaje==true) {
		let buttonId=Date.now();
		let msg = '<h1>Bienvenido al módulo de Eterno Azul</h1><button id='+buttonId+' >Ve al Tutorial</button>'
		ChatMessage.create({
        		speaker: {alias:"Eterno Azul"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
		}).then(() => {
			setTimeout(() => {
			function openInNewTab(url) {
				const win = window.open(url, '_blank');
				win.focus();
			}
			const button = document.getElementById(buttonId);
			if (button) {
				button.addEventListener("click",function () {
					openInNewTab('https://github.com/pedrobaringo/eterno-azul-csb');
				});
			}
			}, 100);
		});
		game.user.setFlag("eterno-azul-csb", "welcomeMessage", true);
		game.settings.set("eterno-azul-csb", "firstTimeStart", false);
	}
})