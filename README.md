# jQuery Column Toggle #
Use this plugin for auto add show/hide to table columns. This plugin will append a div after table, with all links allow show/hide columns of that table.

The visible status will be persistant because it will store status in localStorage. So, if after hide a column, if user refresh (F5) the browser, the hidden columns will still be hidden.

## Installation ##
Install Javascript file

```
...
<script src="jquery.columntoggle.js"></script>
....
```

Install CSS file:

```
...
<link rel="stylesheet" href="jquery.columntoggle.css" />
...
```

## Usage ##
You can call .columntoggle() function to table selectors to init this plugin.

Example:

```
...
$('.mytable').columntoggle(options);
...
```

## Options ##
This plugin need an option object with following properties:

`toggleContainerClass`: class name of toggle container.

`toggleLabel`: Text will be displayed in toggle box. Default: Show/Hide columns: 

`key`: The key will be saved to localStorage, to distinct with other tables of your site. If empty, it will be your site URL. (window.document.href)

`keyPrefix`: The prefix will be prepended before the key in localStorage.

## Notes ##
In some cases, table header (`thead > tr > th`) may contain unwanted text, so, the auto generated column name in the toggle container will display incorrect. 

You can specify the text for that column with attribue `data-collumntoggle` to that column (`thead > tr > th`). Example:

```
<table class="mytable">
	<thead>
		<tr>
			<th>ID</th>
			<th data-columntoggle="Company">CID</th>
			<th>Name</td>
		</tr>
	</thead>
	...
	<tbody>
	</tbody>
</table>	
```	

## Requirement ##
Tables use this plugin must have `<thead>` for table header.

## Full Example ##

```
...
$('.mytable').columntoggle({
	toggleContainerClass: "my-container-class",
	toggleLabel: "Toggle table columns: ",
	keyPrefix: "mysite-",
	key: "company"
});
...