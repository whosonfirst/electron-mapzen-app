function mapzen_api_test(){

	var submit = document.getElementById("submit");
	submit.onclick = function(){
		
		try {
			
    			var api_endpoint = document.body.getAttribute("data-api-endpoint");    
    			var api_key = document.body.getAttribute("data-api-key");
			
    			if (! api_key){
				alert("API key is undefined");
    				return false;
			}
			
    			if (! api_endpoint){
				alert("API endpoint is undefined");
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
		}

		catch(e){
			console.log(e);
		}
		
		return false;
	};
	
}    
