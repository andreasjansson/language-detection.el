<?php
session_start();

require_once 'db.member.inc.php';

$title = $admin[titlebar][value];

if ($pageTitle != "") {
$title .= " :: " . $pageTitle;
}

$userid = $_SESSION['user_id'];
$access_lvl = $_SESSION['access_lvl'];
$username = $_SESSION['name'];
?>
<html>
<head>
<title><?php echo $title; ?></title>
<link rel="stylesheet" type="text/css" href="forum_styles.css">
</head>
<body>
<div class="body">
<div id="header">
<form method="get" action="frm_search.php" id="searchbar">
<input id="searchkeywords" type="text" name="keywords"
<?php
if (isset($_GET['keywords'])) {
echo ' value="' . htmlspecialchars($_GET['keywords']) . '" ';
}
echo 'onfocus="this.select();" '
?>
/>
<input id="searchbutton" class="submit" type="submit" value="Search" />
</form>
<h1 id="sitetitle"><?php echo $admin['title']['value'];?></h1>
<div id="login">
<?php
if (isset($_SESSION['name'])) {
echo 'Welcome, '.$_SESSION['name'];
}
?>
</div>
<p id="subtitle"><?php echo $admin['description']['value']; ?></p>
</div>
<div id="subheader">
<div id='navigation'>
<?php
echo '<a href="frm_index.php">Home</a>';

if (!isset($_SESSION['user_id'])) {
echo ' | <a href="frm_login.php">Log In</a>';
echo ' | <a href="frm_useraccount.php">Register</a>';
} else {
echo ' | <a href="frm_transact_user.php?action=Logout">';
echo "Log out " . $_SESSION['name'] . "</a>";

if ($_SESSION['access_lvl'] > 2) {
echo ' | <a href="frm_admin.php">Admin</a>';
}
echo ' | <a href="frm_useraccount.php">Profile</a>';
}
?>
</div>
</div>