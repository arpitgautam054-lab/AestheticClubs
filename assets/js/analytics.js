export function trackAffiliateClick(itemName, merchant, url) {
  console.log(`[Affiliate Click] ${merchant} - ${itemName}`);
  window.open(url, '_blank', 'noopener,noreferrer');
}