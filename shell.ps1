# Créer une arborescence spécifique pour Next.js
@"
STRUCTURE DU PROJET WHATSAPP-CLONE
================================
"@ | Out-File -FilePath "text.txt"

Get-ChildItem -Recurse -Path . | 
    Where-Object {
        $_.FullName -notlike "*node_modules*" -and 
        $_.FullName -notlike "*.next*" -and 
        $_.FullName -notlike "*\.git*"
    } |
    ForEach-Object {
        $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
        if ($_.PSIsContainer) {
            "📁 $relativePath/"
        } else {
            "📄 $relativePath"
        }
    } | Add-Content -Path "text.txt"