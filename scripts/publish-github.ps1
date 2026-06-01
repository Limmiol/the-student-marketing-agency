param(
  [Parameter(Mandatory=$true)]
  [string]$RemoteUrl,

  [Parameter(Mandatory=$false)]
  [string]$Branch = 'playwright-smoke-tests'
)

Write-Host "Adding remote origin: $RemoteUrl" -ForegroundColor Cyan
if (-not (git remote | Select-String -Quiet '^origin$')) {
  git remote add origin $RemoteUrl
} else {
  Write-Host "Remote 'origin' already exists. Updating URL..." -ForegroundColor Yellow
  git remote set-url origin $RemoteUrl
}

Write-Host "Pushing branch $Branch to origin..." -ForegroundColor Cyan
git push -u origin $Branch
