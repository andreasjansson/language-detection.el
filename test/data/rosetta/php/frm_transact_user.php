<?php
require_once 'db.member.inc.php';
require_once 'frm_http.inc.php';

if (isset($_REQUEST['action'])) {
switch ($_REQUEST['action']) {
case 'Login':
if (isset($_POST['email'])
and isset($_POST['passwd'])) {
$sql = "SELECT id,access_lvl,name,last_login " .
"FROM forum_users " .
"WHERE email='" . $_POST['email'] . "' " .
"AND passwd='" . $_POST['passwd'] . "'";
$result = mysql_query($sql,$conn) or die('Could not look up user information; ' . mysql_error());

if ($row = mysql_fetch_array($result)) {
session_start();
$_SESSION['user_id'] = $row['id'];
$_SESSION['access_lvl'] = $row['access_lvl'];
$_SESSION['name'] = $row['name'];
$_SESSION['last_login'] = $row['last_login'];
$sql = "UPDATE forum_users SET last_login = '".
date("Y-m-d H:i:s",time()) . "' ".
"WHERE id = ". $row['id'];
mysql_query($sql,$conn) or die(mysql_error()."<br>".$sql);
}
}
redirect('frm_index.php');
break;

case 'Logout':
session_start();
session_unset();
session_destroy();

redirect('frm_index.php');
break;

case 'Create Account':
if (isset($_POST['name'])
and isset($_POST['email'])
and isset($_POST['passwd'])
and isset($_POST['passwd2'])
and $_POST['passwd'] == $_POST['passwd2']) {
$sql = "INSERT INTO forum_users ".
"(email,name,passwd,date_joined,last_login) " .
"VALUES ('" . $_POST['email'] . "','" .
$_POST['name'] . "','" . $_POST['passwd'] . "','".
date("Y-m-d H:i:s",time()). "','".
date("Y-m-d H:i:s",time()). "')";

mysql_query($sql,$conn) or die('Could not create user account; ' . mysql_error());

session_start();
$_SESSION['user_id'] = mysql_insert_id($conn);
$_SESSION['access_lvl'] = 1;
$_SESSION['name'] = $_POST['name'];
$_SESSION['login_time'] = date("Y-m-d H:i:s",time());
}
redirect('frm_index.php');
break;

case 'Modify Account':
if (isset($_POST['name'])
and isset($_POST['email'])
and isset($_POST['accesslvl'])
and isset($_POST['userid'])) {
$sql = "UPDATE forum_users " .
"SET email='" . $_POST['email'] .
"', name='" . $_POST['name'] .
"', access_lvl=" . $_POST['accesslvl'] .
", signature='" . $_POST['signature'] . "' " .
" WHERE id=" . $_POST['userid'];

mysql_query($sql,$conn) or die('Could not update user account... ' . mysql_error() .
'<br>SQL: ' . $sql);
}
redirect('frm_admin.php');
break;

case 'Edit Account':
if (isset($_POST['name'])
and isset($_POST['email'])
and isset($_POST['accesslvl'])
and isset($_POST['userid']))
{
$chg_pw = FALSE;
if (isset($_POST['oldpasswd'])
and $_POST['oldpasswd'] != '') {
$sql = "SELECT passwd FROM forum_users " .
"WHERE id=" . $_POST['userid'];
$result = mysql_query($sql) or die(mysql_error());
if ($row = mysql_fetch_array($result)) {
if (($row['passwd'] == $_POST['oldpasswd'])
and (isset($_POST['passwd']))
and (isset($_POST['passwd2']))
and ($_POST['passwd'] == $_POST['passwd2'])) {
$chg_pw = TRUE;
} else {
redirect('frm_useraccount.php?error=nopassedit');
break;
}
}
}

$sql = "UPDATE forum_users " .
"SET email='" . $_POST['email'] .
"', name='" . $_POST['name'] .
"', access_lvl=" . $_POST['accesslvl'] .
", signature='" . $_POST['signature'];

if ($chg_pw) {
$sql .= "', passwd='" . $_POST['passwd'];
}

$sql .= "' WHERE id=" . $_POST['userid'];
mysql_query($sql,$conn) or die('Could not update user account... ' . mysql_error() .
'<br>SQL: ' . $sql);
}
redirect('frm_useraccount.php?blah=' . $_POST['userid']);
break;

case 'Send my reminder!':
if (isset($_POST['email'])) {
$sql = "SELECT passwd FROM forum_users " .
"WHERE email='" . $_POST['email'] . "'";

$result = mysql_query($sql,$conn) or die('Could not look up password; ' . mysql_error());

if (mysql_num_rows($result)) {
$row = mysql_fetch_array($result);

$subject = 'Comic site password reminder';
$body = "Just a reminder, your password for the " .
"Comic Book Appreciation site is: " . $row['passwd'] .
"\n\nYou can use this to log in at http://" .
$_SERVER['HTTP_HOST'] .
dirname($_SERVER['PHP_SELF']) . '/login.php?e='.
$_POST['email'];
$headers = "From: admin@yoursite.com\r\n";
mail($_POST['email'],$subject,$body,$headers) or die('Could not send reminder email.');
}
}
redirect('frm_login.php');
break;
}
}
?>