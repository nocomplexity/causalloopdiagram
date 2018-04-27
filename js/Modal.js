/***********************

Use the same PAGE UI thing

************************/

function Modal(loopy){

	var self = this;
	self.loopy = loopy;
	PageUI.call(self, document.getElementById("modal_page"));

	// Is showing?
	self.isShowing = false;

	// show/hide
	self.show = function(){
		document.getElementById("modal_container").setAttribute("show","yes");
		self.isShowing = true;
	};
	self.hide = function(){
		document.getElementById("modal_container").setAttribute("show","no");
		if(self.currentPage.onhide) self.currentPage.onhide();
		self.isShowing = false;
	};

	// Close button
	document.getElementById("modal_bg").onclick = self.hide;
	document.getElementById("modal_close").onclick = self.hide;

	// Show... what page?
	subscribe("modal", function(pageName){

		self.show();
		var page = self.showPage(pageName);

		// Do something
		if(page.onshow) page.onshow();

		// Dimensions
		var dom = document.getElementById("modal");
		dom.style.width = self.currentPage.width+"px";
		dom.style.height = self.currentPage.height+"px";

	});

	///////////////////
	// PAGES! /////////
	///////////////////

	// Examples
	(function(){
		var page = new Page();
		page.width = 670;
		page.height = 570;
		var iframe = page.addComponent(new ModalIframe({
			page: page,
			src: "pages/examples/",
			width: 640,
			height: 520
		}));
		iframe.dom.style.background = "#f7f7f7";
		self.addPage("examples", page);
	})();

	// How To
	(function(){
		var page = new Page();
		page.width = 530;
		page.height = 430;
		page.addComponent(new ModalIframe({
			page: page,
			src: "pages/howto.html",
			width: 500,
			height: 350
		}));

		var label = document.createElement("div");
		label.style.fontSize = "18px";
		label.style.marginTop = "6px";
		label.style.color = "#777";
		label.innerHTML = "Check our repository to learn form others! <span style='text-decoration:underline; cursor:pointer' onclick='publish(\"modal\",[\"examples\"])'>the examples!</span>";
		page.dom.appendChild(label);

		self.addPage("howto", page);

	})();

	
	// Save as link
	(function(){
		var page = new Page();
		page.width = 500;
		page.height = 300;
		page.addComponent(new ComponentHTML({
			html: "Save your link:<br>"
		}));
		var output = page.addComponent(new ComponentOutput({}));

		var label = document.createElement("div");
		label.style.textAlign = "left";
		label.style.fontSize = "15px";
		label.style.marginTop = "6px";
		label.style.color = "#000000";
		label.innerHTML = "<br>You can use the saved link to display your Causal Loop Diagram when you want!";
		page.dom.appendChild(label);

		// chars left...
		var chars = document.createElement("div");
		chars.style.textAlign = "right";
		chars.style.fontSize = "15px";
		chars.style.marginTop = "3px";
		chars.style.color = "#000000";
		chars.innerHTML = "<br>Thank you for using this Nocomplexity.com tool!";
		page.dom.appendChild(chars);

		page.onshow = function(){

			// Copy-able link
			var link = loopy.saveToURL();
			output.output(link);
			output.dom.select();

			// Chars left
			var html = link.length+" / of max 2048 characters";
			if(link.length>2048){
				html += " - MAY BE TOO LONG FOR MOST BROWSERS";
			}
			chars.innerHTML = html + "<br><br>Thank you for using this Nocomplexity.com tool!";
			chars.style.fontWeight = (link.length>2048) ? "bold" : "100";
			chars.style.fontSize = (link.length>2048) ? "14px" : "15px";

		};

		// or, tweet it
		self.addPage("save_link", page);
	})();


// Mail as link (added by MM)
(function(){
	var page = new Page();
	page.width = 550;
	page.height = 400;
	page.addComponent(new ComponentHTML({
		html: "<div>Mail your diagram !<br>"
	}));
	
    
	//var output = page.addComponent(new ComponentOutput({}));
	page.onshow  = function(){
		// Copy-able link
		var link = loopy.saveToURL();
		//output.output(link);
		//output.dom.select();
		
		//console.log('This is link:' + link);	

		// Chars left
		var html = '<br>size of your CLD: ' + link.length + " - of max 2048 characters<br>";
		if(link.length>2048){
			html += " - MAY BE TOO LONG FOR MOST BROWSERS<br>";
		}
		

		var label = document.createElement("div");
		label.style.textAlign = "left";
		label.style.fontSize = "14px";
		label.style.marginTop = "6px";
		label.style.color = "#000000";

		var bodytext = 'If you want your Causal Loop Diagram added to our open access CLD repository, send your email to: info [at]bm-support [dot] org %0D%0A %0D%0A This is the link to your diagram:%0D%0A%0D%0A';
		

		var mailstring = '<div id=bms><a href="mailto:change.this@your.name?subject=Causal-Loop-Diagram&body=' + bodytext + encodeURIComponent(link) + '">' + 'Mail-Link-To-YOUR-DIAGRAM' + '</a></div>';
		//note the encodeURI is crucial!
		
		label.innerHTML = '<br>If you want your Causal Loop Diagram added to our the repository, send your email to: info [at]bm-support.org <br><br> '+ mailstring + '<br><br>' + html + '<br>';
		//page.dom.appendChild(label);
		page.dom.replaceChild(label, page.dom.childNodes[1]);
		
		}
		
 
	
	// chars left...
	var chars = document.createElement("div");
	chars.style.textAlign = "right";
	chars.style.fontSize = "15px";
	chars.style.marginTop = "3px";
	chars.style.color = "#000000";
	chars.innerHTML = "<br>Thank you for using this Nocomplexity.com tool!</div>";
	page.dom.appendChild(chars);

		

	// or, tweet it
	self.addPage("mail_link", page);
})();



	// Embed
	(function(){
		var page = new Page();
		page.width = 700;
		page.height = 500;

		// ON UPDATE DIMENSIONS
		var iframeSRC;
		var _onUpdate = function(){
			var embedCode = '<iframe width="'+width.getValue()+'" height="'+height.getValue()+'" frameborder="0" src="'+iframeSRC+'"></iframe>';
			output.output(embedCode);
		};

		// THE SHTUFF
		var sidebar = document.createElement("div");
		sidebar.style.width = "150px";
		sidebar.style.height = "440px";
		sidebar.style.float = "left";
		page.dom.appendChild(sidebar);

		// Label
		var label = document.createElement("div");
		label.innerHTML = "<br>PREVIEW &rarr;<br><br>";
		sidebar.appendChild(label);

		// Label 2
		var label = document.createElement("div");
		label.style.fontSize = "15px";
		label.innerHTML = "what size do you want your embed to be?";
		sidebar.appendChild(label);

		// Size!
		var width = _createNumberInput(_onUpdate);
		sidebar.appendChild(width.dom);
		var label = document.createElement("div");
		label.style.display = "inline-block";
		label.style.fontSize = "15px";
		label.innerHTML = "&nbsp;×&nbsp;";
		sidebar.appendChild(label);
		var height = _createNumberInput(_onUpdate);
		sidebar.appendChild(height.dom);

		// Label 3
		var label = document.createElement("div");
		label.style.fontSize = "15px";
		label.innerHTML = "<br><br>copy this code into your website's html:";
		sidebar.appendChild(label);

		// Output!
		var output = new ComponentOutput({});
		output.dom.style.fontSize = "12px";
		sidebar.appendChild(output.dom);

		// Label 3
		var label = document.createElement("div");
		label.style.fontSize = "15px";
		label.style.textAlign = "right";
		label.innerHTML = "<br><br>(note: the REMIX button lets someone else, well, remix your model! don't worry, it'll just be a copy, it won't affect the original.)";
		sidebar.appendChild(label);

		// IFRAME
		var iframe = page.addComponent(new ModalIframe({
			page: page,
			manual: true,
			src: "",
			width: 500,
			height: 440
		})).dom;
		iframe.style.float = "right";
		page.onshow = function(){

			// Default dimensions
			width.setValue(500);
			height.setValue(440);

			// The iframe!
			iframeSRC = loopy.saveToURL(true);
			iframe.src = iframeSRC;

			// Select to copy-paste
			_onUpdate();
			output.dom.select();

		};
		page.onhide = function(){
			iframe.removeAttribute("src");
		};
		self.addPage("embed", page);


	})();

	// GIF
	(function(){
		var page = new Page();
		page.width = 530;
		page.height = 400;
		page.addComponent(new ModalIframe({
			page: page,
			src: "pages/gif.html",
			width: 500,
			height: 350
		}))
		self.addPage("save_gif", page);
	})();

}

function ModalIframe(config){

	var self = this;

	// IFRAME
	var iframe = document.createElement("iframe");
	self.dom = iframe;
	iframe.width = config.width;
	iframe.height = config.height;

	// Show & Hide
	if(!config.manual){
		config.page.onshow = function(){
			iframe.src = config.src;
		};
		config.page.onhide = function(){
			iframe.removeAttribute("src");
		};
	}

}