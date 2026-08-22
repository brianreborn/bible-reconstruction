Set-Location $PSScriptRoot
Write-Host "Reconstruction Atlas -> http://localhost:8765/"
python -m http.server 8765 --directory $PSScriptRoot
