$wshell = New-Object -ComObject WScript.Shell
$s1 = $wshell.CreateShortcut("c:\Users\mikol\Downloads\prezka\prezka\nastepny.lnk")
$s1.TargetPath = "wscript.exe"
$s1.Arguments = """c:\Users\mikol\Downloads\prezka\prezka\nastepny_slajd.vbs"""
$s1.Save()

$s2 = $wshell.CreateShortcut("c:\Users\mikol\Downloads\prezka\prezka\poprzedni.lnk")
$s2.TargetPath = "wscript.exe"
$s2.Arguments = """c:\Users\mikol\Downloads\prezka\prezka\poprzedni_slajd.vbs"""
$s2.Save()
