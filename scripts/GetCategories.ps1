$Key = [xml](Get-Content .\config.xml)
$Header = @{
    'User-Key' = $Key.production.key
}
$r = Invoke-RestMethod -Method Get -Uri "https://developers.zomato.com/api/v2.1/categories" -Headers $Header
$r.categories.categories