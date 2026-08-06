param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$FirebaseArguments = @("deploy", "--only", "hosting")
)

$ErrorActionPreference = "Stop"
$nodeDirectory = Get-ChildItem (Join-Path $PSScriptRoot "..\private-data\tools") -Directory -Filter "node-v*-win-x64" |
    Sort-Object Name -Descending |
    Select-Object -First 1

if (-not $nodeDirectory) {
    throw "Local Node.js is missing. Install it under private-data/tools first."
}

$env:Path = $nodeDirectory.FullName + ";" + $env:Path
$firebase = Join-Path $PSScriptRoot "..\node_modules\.bin\firebase.cmd"
if (-not (Test-Path $firebase)) {
    throw "Firebase CLI is missing. Restore the package-lock dependencies first."
}

& $firebase @FirebaseArguments
exit $LASTEXITCODE
