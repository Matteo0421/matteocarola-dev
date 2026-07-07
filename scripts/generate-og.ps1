# Genera gli asset raster del sito (una tantum, committati in public/):
#   - public/og.png              1200x630, immagine Open Graph
#   - public/apple-touch-icon.png 180x180
# Uso:  powershell -ExecutionPolicy Bypass -File scripts/generate-og.ps1
# Nota: usa GDI+ (System.Drawing), quindi richiede Windows.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'

$bgColor = [System.Drawing.ColorTranslator]::FromHtml('#FAFAF8')
$inkColor = [System.Drawing.ColorTranslator]::FromHtml('#141412')
$accentColor = [System.Drawing.ColorTranslator]::FromHtml('#2563EB')
$muteColor = [System.Drawing.ColorTranslator]::FromHtml('#73736C')
$lineColor = [System.Drawing.ColorTranslator]::FromHtml('#E3E3DB')

# --- og.png -----------------------------------------------------------------
$bmp = New-Object System.Drawing.Bitmap 1200, 630
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'
$g.Clear($bgColor)

$linePen = New-Object System.Drawing.Pen $lineColor, 2
$g.DrawRectangle($linePen, 1, 1, 1197, 627)

$accentBrush = New-Object System.Drawing.SolidBrush $accentColor
$inkBrush = New-Object System.Drawing.SolidBrush $inkColor
$muteBrush = New-Object System.Drawing.SolidBrush $muteColor

$g.FillRectangle($accentBrush, 80, 140, 110, 10)

$kickerFont = New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Bold)
$nameFont = New-Object System.Drawing.Font('Segoe UI', 76, [System.Drawing.FontStyle]::Bold)
$siteFont = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular)

$g.DrawString('SOFTWARE ENGINEER - CLOUD & AI ENGINEERING - AWS', $kickerFont, $accentBrush, 74, 190)
$g.DrawString('Matteo Carola', $nameFont, $inkBrush, 64, 250)
$g.DrawString('matteocarola.dev', $siteFont, $muteBrush, 76, 520)

$bmp.Save((Join-Path $publicDir 'og.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# --- apple-touch-icon.png ---------------------------------------------------
$icon = New-Object System.Drawing.Bitmap 180, 180
$gi = [System.Drawing.Graphics]::FromImage($icon)
$gi.SmoothingMode = 'AntiAlias'
$gi.TextRenderingHint = 'AntiAliasGridFit'
$gi.Clear($bgColor)

$iconFont = New-Object System.Drawing.Font('Segoe UI', 52, [System.Drawing.FontStyle]::Bold)
$textSize = $gi.MeasureString('MC', $iconFont)
$gi.DrawString('MC', $iconFont, $inkBrush, (180 - $textSize.Width) / 2, 38)
$gi.FillRectangle($accentBrush, 45, 130, 90, 10)

$icon.Save((Join-Path $publicDir 'apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$gi.Dispose(); $icon.Dispose()

$kickerFont.Dispose(); $nameFont.Dispose(); $siteFont.Dispose(); $iconFont.Dispose()
$accentBrush.Dispose(); $inkBrush.Dispose(); $muteBrush.Dispose(); $linePen.Dispose()

Write-Output 'Generati: public/og.png, public/apple-touch-icon.png'
