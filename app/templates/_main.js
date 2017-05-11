<% if (includeJQuery) { %>
$(document).ready(function() {
	<% if (includeES6) { %>"use strict";<% } %>
	console.log('js hooked up');
});
<% } else { %>
document.addEventListener("DOMContentLoaded", function() {
	<% if (includeES6) { %>"use strict";<% } %>
	console.log('js hooked up');
});
<% } %>

