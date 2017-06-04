(function(f){

        if (typeof exports === "object" && typeof module !== "undefined"){
		module.exports = f();
        }
	
        else if (typeof define === "function" && define.amd){
		define([],f);
        }
	
        else {
		var g;
		
		if (typeof window!=="undefined") {
			g=window;
		} else if (typeof global!=="undefined") {
			g=global;
		} else if (typeof self!=="undefined") {
			g=self;
		} else {
			g=this;
		}

		g.mapzen = g.mapzen || {};
		g.mapzen.api = g.mapzen.api || {};
		g.mapzen.api.test = g.mapzen.api.test = f();
	}
	
}(function(){

	var self = {

		'init': function(){
			
			var submit = document.getElementById("submit");
			submit.onclick = self.test;
		},

		'test': function(){
		
    			var api_endpoint = document.body.getAttribute("data-api-endpoint");    
    			var api_key = document.body.getAttribute("data-api-key");
			
    			if (! api_key){
				alert("API key is not defined");
    				return false;
			}
			
    			if (! api_endpoint){
				alert("API endpoint is not defined");
    				return false;
			}
			
    			var params = {
				"api_key": api_key,
			};
			
    			var q = document.getElementById("q");
			q = q.value;
			
			if (q.indexOf('?') != -1){
				q = q.replace("?", "");
			}
			
    			q = q.split("&");
			
			var count_q = q.length;
			
			for (var i=0; i < count_q; i++){
				var pair = q[i].split("=");
				params[ pair[0] ] = pair[1];
			}
				
			var str_params = [];
			
			for (k in params) {
				var v = params[k];
				
				k = encodeURIComponent(k);
				v = encodeURIComponent(v);			  
				
				str_params.push([k, v].join("="));
			}
			
			str_params = str_params.join("&");
			
			var url = api_endpoint + "?" + str_params;
			
			self.execute_request(url);
			return false;
		},

		'execute_request': function(url){
				
			var onload = function(rsp){
					
				var target = rsp.target;
				
				if (target.readyState != 4){
					return;
				}
				
				var status_code = target['status'];
				var status_text = target['statusText'];
				
				var raw = target['responseText'];
				
				var body = [
					url,
					status_code + " " + status_text,
					raw,
				];
				
				body = body.join("\n");
				
				var pre = document.createElement("pre");
				pre.setAttribute("class", "test-results");				
				pre.innerText = body;
				
    				var results = document.getElementById("results");
				results.innerHTML = "";
				
				results.appendChild(pre);
			};
			
			var req = new XMLHttpRequest();
			
			req.addEventListener("load", onload);		
			req.open("GET", url, true);
			req.send();
				
    			var results = document.getElementById("results");
			results.innerText = "GET " + url;
		},
	};

	return self;
}));
