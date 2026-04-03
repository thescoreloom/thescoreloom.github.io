@echo off
setlocal enabledelayedexpansion

powershell -Command ^
    "$div = '<div id=\"dot-menu-trigger\" class=\"dot-trigger\"></div>'; ^
    Get-ChildItem *.html | ForEach-Object { ^
        $content = Get-Content $_.FullName -Raw; ^
        if ($content -match '(?i)<body[^>]*>') { ^
            $content = $content -replace '(?i)(<body[^>]*>)', ('$1' + \"`r`n\" + $div); ^
            $content | Set-Content $_.FullName -NoNewline; ^
            Write-Host 'File aggiornato: ' $_.Name -ForegroundColor Green; ^
        } else { ^
            Write-Host 'Tag body non trovato in: ' $_.Name -ForegroundColor Yellow; ^
        } ^
    }"

pause