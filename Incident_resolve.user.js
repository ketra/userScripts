// ==UserScript==
// @name         Incident_resolve
// @namespace    https://github.com/ketra/userScripts/raw/master/Incident_resolve.user.js
// @version      0.3
// @description  This will Help resolve incidents in Service now
// @author       https://github.com/ketra/
// @include      https://*incident.do*
// @grant        none
// @updateURL	 https://github.com/ketra/userScripts/raw/master/Incident_resolve.user.js
// ==/UserScript==

(function() {
    'use strict';

    var header = document.getElementById('incident.form_header');
    var matches = header.querySelectorAll("[id*='sysverb_update_and_stay");
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Resolve Incident");
    btn.className = "form_action_button header  action_context btn btn-default";
    btn.appendChild(t);
    if (g_form.getValue('state') > 1 || !isEmpty(g_form.getValue('number')) )
    {
        insertAfter(btn,matches[0]);
    }

    btn.addEventListener("click", function() {
        var CloseText = prompt("Please fill in a text to close the incident.");
        //var cause = g_form.getValue('u_cause_code'); //software
        //var comp = g_form.getValue('u_cause_comp'); //66fe4bc86f106200bb3cd107eb3ee452
        //var close = g_form.getValue('close_code'); //Afgehandeld
        //var assigned =  g_form.getValue('assigned_to'); //373282636ff8a1000879a15dbb3ee44d

        g_form.setValue('state',6);
        g_form.setValue('assigned_to', g_user.userID);
        g_form.setValue('u_cause_code', 'software');
        g_form.setValue('u_cause_comp', '66fe4bc86f106200bb3cd107eb3ee452');
        g_form.setValue('close_code', 'Afgehandeld');
        g_form.setValue("comments", CloseText);
		// Flashing
		g_form.flash("state", "#ff0000", -4);
		g_form.flash("assigned_to", "#ff0000", -4);
		g_form.flash("u_cause_code", "#ff0000", -4);
		g_form.flash("close_code", "#ff0000", -4);
		g_form.flash("comments", "#ff0000", -4);
}, false);
})();

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function isEmpty(str) {
    return (!str || 0 === str.length);
}