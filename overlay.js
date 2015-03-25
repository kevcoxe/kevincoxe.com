var _acx_overlay = new function() {

    var s=document.getElementsByTagName('script')[0]; w = document.createElement('script');
    w.defer=true; w.async=true; w.src='//wurfl.io/wurfl.js';
    s.parentNode.insertBefore(w,s);

    // asynchronous overlay (or proxy)
    if (typeof _acx_overlay !== 'object') {
        _acx_overlay = [];
    }

    for (iterator = 0; iterator < _acx_overlay.length; iterator++) {
        if (_acx_overlay[iterator][0] == "floatdiv") {
            this.config_floatdiv = _acx_overlay[iterator][1];
            delete _acx_overlay[iterator];
        } else if (_acx_overlay[iterator][0] == "floatdiv_description") {
            this.config_floatdiv_description = _acx_overlay[iterator][1];
            delete _acx_overlay[iterator];
        } else if (_acx_overlay[iterator][0] == "floatdiv_form") {
            this.config_floatdiv_form = _acx_overlay[iterator][1];
            delete _acx_overlay[iterator];
        } else if (_acx_overlay[iterator][0] == "floatdiv_id") {
            this.config_floatdiv_id = _acx_overlay[iterator][1];
            delete _acx_overlay[iterator];
        } else if (_acx_overlay[iterator][0] == "invisible_div_id") {
            this.config_invisible_div_id = _acx_overlay[iterator][1];
            delete _acx_overlay[iterator];
        }
    }


    var acx_floating_overlay = {
        hasInner: typeof(window.innerWidth) == 'number',
        hasElement: typeof(document.documentElement) == 'object'
            && typeof(document.documentElement.clientWidth) == 'number'
    };
    
    var floatingArray = [];
    
    acx_floating_overlay.add = function(obj, options) {
        var name;
        var menu;
    
        if (typeof(obj) === "string")
            name = obj;
        else
            menu = obj;
    
    
        if (options == undefined) {
            floatingArray.push(
                {
                    id: name,
                    menu: menu,
    
                    targetLeft: 0,
                    targetTop: 0,
    
                    distance: .07,
                    snap: true,
                    updateParentHeight: false
                });
        }
        else {
            floatingArray.push(
                {
                    id: name,
                    menu: menu,
    
                    targetLeft: options.targetLeft,
                    targetRight: options.targetRight,
                    targetTop: options.targetTop,
                    targetBottom: options.targetBottom,
    
                    centerX: options.centerX,
                    centerY: options.centerY,
    
                    prohibitXMovement: options.prohibitXMovement,
                    prohibitYMovement: options.prohibitYMovement,
    
                    distance: options.distance != undefined ? options.distance : .07,
                    snap: options.snap,
                    ignoreParentDimensions: options.ignoreParentDimensions,
                    updateParentHeight:
                        options.updateParentHeight == undefined
                        ? false
                        : options.updateParentHeight,
    
                    scrollContainer: options.scrollContainer,
                    scrollContainerId: options.scrollContainerId,
    
                    confinementArea: options.confinementArea,
    
                    confinementAreaId:
                        options.confinementArea != undefined
                        && options.confinementArea.substring(0, 1) == '#'
                        ? options.confinementArea.substring(1)
                        : undefined,
    
                    confinementAreaClassRegexp:
                        options.confinementArea != undefined
                        && options.confinementArea.substring(0, 1) == '.'
                        ? new RegExp("(^|\\s)" + options.confinementArea.substring(1) + "(\\s|$)")
                        : undefined
                });
        }
    };
    
    acx_floating_overlay.findSingle = function(item) {
        if (item.id)
            item.menu = document.getElementById(item.id);
    
        if (item.scrollContainerId)
            item.scrollContainer = document.getElementById(item.scrollContainerId);
    };
    
    acx_floating_overlay.move = function (item) {
        if (!item.prohibitXMovement) {
            item.menu.style.left = item.nextX + 'px';
            item.menu.style.right = '';
        }
    
        if (!item.prohibitYMovement) {
            item.menu.style.top = item.nextY + 'px';
            item.menu.style.bottom = '';
        }
    };
    
    acx_floating_overlay.scrollLeft = function(item) {
        // If floating within scrollable container use it's scrollLeft
        if (item.scrollContainer)
            return item.scrollContainer.scrollLeft;
    
        var w = window.top;
    
        return this.hasInner
            ? w.pageXOffset
            : this.hasElement
              ? w.document.documentElement.scrollLeft
              : w.document.body.scrollLeft;
    };
    
    acx_floating_overlay.scrollTop = function(item) {
        // If floating within scrollable container use it's scrollTop
        if (item.scrollContainer)
            return item.scrollContainer.scrollTop;
    
        var w = window.top;
    
        return this.hasInner
            ? w.pageYOffset
            : this.hasElement
              ? w.document.documentElement.scrollTop
              : w.document.body.scrollTop;
    };
    
    acx_floating_overlay.windowWidth = function() {
        return this.hasElement
            ? document.documentElement.clientWidth
            : document.body.clientWidth;
    };
    
    acx_floating_overlay.windowHeight = function() {
        if (acx_floating_overlay.hasElement && acx_floating_overlay.hasInner) {
            // Handle Opera 8 problems
            return document.documentElement.clientHeight > window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight
        }
        else {
            return acx_floating_overlay.hasElement
                ? document.documentElement.clientHeight
                : document.body.clientHeight;
        }
    };
    
    acx_floating_overlay.documentHeight = function() {
        var innerHeight = this.hasInner
            ? window.innerHeight
            : 0;
    
        var body = document.body,
            html = document.documentElement;
    
        return Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight,
            innerHeight);
    };
    
    acx_floating_overlay.documentWidth = function() {
        var innerWidth = this.hasInner
            ? window.innerWidth
            : 0;
    
        var body = document.body,
            html = document.documentElement;
    
        return Math.max(
            body.scrollWidth,
            body.offsetWidth,
            html.clientWidth,
            html.scrollWidth,
            html.offsetWidth,
            innerWidth);
    };
    
    acx_floating_overlay.calculateCornerX = function(item) {
        var offsetWidth = item.menu.offsetWidth;
    
        var result = this.scrollLeft(item) - item.parentLeft;
    
        if (item.centerX) {
            result += (this.windowWidth() - offsetWidth)/2;
        }
        else if (item.targetLeft == undefined) {
            result += this.windowWidth() - item.targetRight - offsetWidth;
        }
        else {
            result += item.targetLeft;
        }
    
        if (document.body != item.menu.parentNode
            && result + offsetWidth >= item.confinedWidthReserve) {
            result = item.confinedWidthReserve - offsetWidth;
        }
    
        if (result < 0)
            result = 0;
    
        return result;
    };
    
    acx_floating_overlay.calculateCornerY = function(item) {
        var offsetHeight = item.menu.offsetHeight;
    
        var result = this.scrollTop(item) - item.parentTop;
    
        if (item.centerY) {
            result += (this.windowHeight() - offsetHeight)/2;
        }
        else if (item.targetTop === undefined) {
            result += this.windowHeight() - item.targetBottom - offsetHeight;
        }
        else {
            result += item.targetTop;
        }
    
        if (document.body != item.menu.parentNode
            && result + offsetHeight >= item.confinedHeightReserve) {
            result = item.confinedHeightReserve - offsetHeight;
        }
    
        if (result < 0)
            result = 0;
    
        return result;
    };
    
    acx_floating_overlay.isConfinementArea = function(item, area) {
        return item.confinementAreaId != undefined
            && area.id == item.confinementAreaId
            || item.confinementAreaClassRegexp != undefined
            && area.className
            && item.confinementAreaClassRegexp.test(area.className);
    };
    
    acx_floating_overlay.computeParent = function(item) {
        if (item.ignoreParentDimensions) {
            item.confinedHeightReserve = this.documentHeight();
            item.confinedWidthReserver = this.documentWidth();
            item.parentLeft = 0;
            item.parentTop = 0;
            return;
        }
    
        var parentNode = item.menu.parentNode;
        var parentOffsets = this.offsets(parentNode, item);
        item.parentLeft = parentOffsets.left;
        item.parentTop = parentOffsets.top;
    
        item.confinedWidthReserve = parentNode.clientWidth;
    
        // We could have absolutely-positioned DIV wrapped
        // inside relatively-positioned. Then parent might not
        // have any height. Try to find parent that has
        // and try to find whats left of its height for us.
        var obj = parentNode;
        var objOffsets = this.offsets(obj, item);
    
        if (item.confinementArea == undefined) {
            while (obj.clientHeight + objOffsets.top
                       < item.menu.scrollHeight + parentOffsets.top
                   || item.menu.parentNode == obj
                   && item.updateParentHeight
                   && obj.clientHeight + objOffsets.top
                       == item.menu.scrollHeight + parentOffsets.top) {
                obj = obj.parentNode;
                objOffsets = this.offsets(obj, item);
            }
        }
        else {
            while (obj.parentNode != undefined
                   && !this.isConfinementArea(item, obj)) {
                obj = obj.parentNode;
                objOffsets = this.offsets(obj, item);
            }
        }
    
        item.confinedHeightReserve = obj.clientHeight
            - (parentOffsets.top - objOffsets.top);
    };
    
    acx_floating_overlay.offsets = function(obj, item) {
        var result = {
            left: 0,
            top: 0
        };
    
        if (obj === item.scrollContainer)
            return;
    
        while (obj.offsetParent && obj.offsetParent != item.scrollContainer) {
            result.left += obj.offsetLeft;
            result.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
    
        if (window == window.top)
            return result;
    
        // we're IFRAMEd
        var iframes = window.top.document.body.getElementsByTagName("IFRAME");
        for (var i = 0; i < iframes.length; i++) {
            if (iframes[i].contentWindow != window)
               continue;
    
            obj = iframes[i];
            while (obj.offsetParent) {
                result.left += obj.offsetLeft;
                result.top += obj.offsetTop;
                obj = obj.offsetParent;
            }
        }
    
        return result;
    };
    
    acx_floating_overlay.doFloatSingle = function(item) {
        this.findSingle(item);
    
        if (item.updateParentHeight) {
            item.menu.parentNode.style.minHeight =
                item.menu.scrollHeight + 'px';
        }
    
        var stepX, stepY;
    
        this.computeParent(item);
    
        var cornerX = this.calculateCornerX(item);
    
        var stepX = (cornerX - item.nextX) * item.distance;
        if (Math.abs(stepX) < .5 && item.snap
            || Math.abs(cornerX - item.nextX) <= 1) {
            stepX = cornerX - item.nextX;
        }
    
        var cornerY = this.calculateCornerY(item);
    
        var stepY = (cornerY - item.nextY) * item.distance;
        if (Math.abs(stepY) < .5 && item.snap
            || Math.abs(cornerY - item.nextY) <= 1) {
            stepY = cornerY - item.nextY;
        }
    
        if (Math.abs(stepX) > 0 ||
            Math.abs(stepY) > 0) {
            item.nextX += stepX;
            item.nextY += stepY;
            this.move(item);
        }
    };
    
    acx_floating_overlay.fixTargets = function() {};
    
    acx_floating_overlay.fixTarget = function(item) {};
    
    acx_floating_overlay.doFloat = function() {
        this.fixTargets();
        for (var i=0; i < floatingArray.length; i++) {
            this.fixTarget(floatingArray[i]);
            this.doFloatSingle(floatingArray[i]);
        }
        setTimeout('acx_floating_overlay.doFloat()', 20);
    };
    
    acx_floating_overlay.insertEvent = function(element, event, handler) {
        // W3C
        if (element.addEventListener != undefined) {
            element.addEventListener(event, handler, false);
            return;
        }
    
        var listener = 'on' + event;
    
        // MS
        if (element.attachEvent != undefined) {
            element.attachEvent(listener, handler);
            return;
        }
    
        // Fallback
        var oldHandler = element[listener];
        element[listener] = function (e) {
                e = (e) ? e : window.event;
                var result = handler(e);
                return (oldHandler != undefined)
                    && (oldHandler(e) == true)
                    && (result == true);
            };
    };
    
    acx_floating_overlay.init = function() {
        acx_floating_overlay.fixTargets();
    
        for (var i=0; i < floatingArray.length; i++) {
            acx_floating_overlay.initSingleMenu(floatingArray[i]);
        }
    
        setTimeout('acx_floating_overlay.doFloat()', 100);
    };
    
    // Some browsers init scrollbars only after
    // full document load.
    acx_floating_overlay.initSingleMenu = function(item) {
        this.findSingle(item);
        this.computeParent(item);
        this.fixTarget(item);
        item.nextX = this.calculateCornerX(item);
        item.nextY = this.calculateCornerY(item);
        this.move(item);
    };



	this.floatdiv = this.config_floatdiv || "color:#111; font-size:300%; padding:5px; text-align:center; font-family:sans-serif;";
	this.floatdiv_description = this.config_floatdiv_description || "color:#111;font-size: 200%;padding: 5px;text-align: center;font-family: sans-serif;";
	this.floatdiv_form = this.config_floatdiv_form || "color:#111;width: 100%;font-size: 230%;padding: 5px;margin-bottom: 10px;text-align: center;font-family: sans-serif;";
	this.floatdiv_id = this.config_floatdiv_id || "color:#111;visibility: hidden;position:absolute;width:90%;height:500px;padding:16px;background:#F8F8F8;font-family: sans-serif;";
	this.invisible_div_id = this.config_invisible_div_id || "color:#111;display:none;top:0px;left:0px;width: 100%;height:100%;background-color: #000;opacity: 0.7;position: fixed;font-family: sans-serif;";


	this.setCookie = function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	this.getCookie = function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	this.checkCookie = function() {
	    var data=this.getCookie("adchemix_cookie");
	    if (data != "") {
	        return true;
	    } else {
	       this.setCookie("adchemix_cookie", "1", 30);
	       return false;
	    }
	}

	this.start_overlay = function() {

		if(!this.checkCookie() && WURFL.is_mobile) {

			// click to exit area
			var invisible_div = document.createElement('div');
			invisible_div.setAttribute("id", "invisible_div");
			invisible_div.setAttribute("style", this.invisible_div_id);

			var popup_div = document.createElement('div')
			popup_div.setAttribute("id", "floatdiv");
			popup_div.setAttribute("style", this.floatdiv_id);
            popup_div.setAttribute("tabindex","0");

			// title
			var popup_div_title = document.createElement('div');

			popup_div_title.setAttribute("style", this.floatdiv);
			popup_div_title.innerHTML = "Using Mobile?";

			// close popup (X)
			var popup_close = document.createElement('span');
			popup_close.setAttribute('id', 'floatdiv_close');
			popup_close.style.float = "right";
			popup_close.innerHTML = "&#10006;";
			popup_div_title.appendChild(popup_close);
			popup_div.appendChild(popup_div_title);
			popup_div.appendChild(document.createElement("hr"));

			// popup description
			var popup_div_description = document.createElement('h1');

			popup_div_description.setAttribute("style", this.floatdiv_description);
			popup_div_description.innerHTML = "Enter your email if you would like to recieve more information.";
			popup_div.appendChild(popup_div_description);

			// email input form
			var popup_form = document.createElement("form");
			var popup_input_div = document.createElement("div");
			var input_email = document.createElement("input");

			input_email.setAttribute("style", this.floatdiv_form);
			input_email.setAttribute("name", "email");
			input_email.setAttribute("placeholder", "EMAIL ADDRESS");
			input_email.setAttribute("type", "email");

			// submit button
			var popup_submit_div = document.createElement("div");
			var input_submit = document.createElement("button");

			input_submit.setAttribute("style", this.floatdiv_form);
			input_submit.setAttribute("id", "floatdiv_submit");
			input_submit.setAttribute("type", "email");
			input_submit.appendChild(document.createTextNode("Submit"));

			// add form to popup
			popup_input_div.appendChild(input_email);
			popup_submit_div.appendChild(input_submit);
			popup_form.appendChild(popup_input_div);
			popup_form.appendChild(popup_submit_div);
			popup_div.appendChild(popup_form);

			document.body.appendChild(popup_div);
			document.body.appendChild(invisible_div);

			document.getElementById('invisible_div').onclick = function() {
    			document.getElementById('floatdiv').style.visibility = 'hidden';
    			document.getElementById('invisible_div').style.display = 'none';
			}
			document.getElementById('floatdiv_close').onclick = function() {
    			document.getElementById('floatdiv').style.visibility = 'hidden';
    			document.getElementById('invisible_div').style.display = 'none';
			}
			document.getElementById('floatdiv_submit').onclick = function() {
    			document.getElementById('floatdiv').style.visibility = 'hidden';
    			document.getElementById('invisible_div').style.display = 'none';
    			alert("Thank you for your submision!\n"+input_email.value)
			}

			acx_floating_overlay.add('floatdiv', {
				// Represents distance from left or right browser window
				// border depending upon property used. Only one should be
				// specified.
				// targetLeft: 0,
				// targetRight: 30,

				// Represents distance from top or bottom browser window
				// border depending upon property used. Only one should be
				// specified.
				// targetTop: 30,
				// targetBottom: 0,

				// Uncomment one of those if you need centering on
				// X- or Y- axis.
				centerX: true,
				centerY: true,

				// Remove this one if you don't want snap effect
				snap: true
			});

			acx_floating_overlay.init();


			setTimeout(function() {
				document.getElementById('floatdiv').style.visibility = 'visible';
				document.getElementById("invisible_div").style.display = "block";
			},2000);
		}
	}

    this.start_overlay();


}

