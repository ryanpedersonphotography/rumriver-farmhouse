#!/bin/bash

# Load environment variables
source /Users/ryanpederson/Dev/websites/.env

DOMAIN="rumriverfarmhouse.com"
NETLIFY_DOMAIN="rumriver-farmhouse.netlify.app"

echo "🌐 Configuring DNS for $DOMAIN to point to $NETLIFY_DOMAIN"

# NameCheap API endpoint
API_URL="https://api.namecheap.com/xml.response"

# Split domain into SLD and TLD
SLD="rumriverfarmhouse"
TLD="com"

echo "📋 Setting up DNS records..."

# Function to add/update DNS record
add_dns_record() {
    local hostname=$1
    local record_type=$2
    local address=$3
    
    echo "  → Adding $record_type record: $hostname -> $address"
    
    curl -s "$API_URL" \
        -d "ApiUser=$NAMECHEAP_API_USER" \
        -d "ApiKey=$NAMECHEAP_API_KEY" \
        -d "UserName=$NAMECHEAP_USERNAME" \
        -d "ClientIp=$NAMECHEAP_CLIENT_IP" \
        -d "Command=namecheap.domains.dns.setHosts" \
        -d "SLD=$SLD" \
        -d "TLD=$TLD" \
        -d "HostName1=@" \
        -d "RecordType1=CNAME" \
        -d "Address1=$NETLIFY_DOMAIN" \
        -d "HostName2=www" \
        -d "RecordType2=CNAME" \
        -d "Address2=$NETLIFY_DOMAIN" > /tmp/namecheap_response.xml
    
    if grep -q "Status=\"OK\"" /tmp/namecheap_response.xml; then
        echo "  ✅ DNS records configured successfully"
        return 0
    else
        echo "  ❌ Failed to configure DNS records"
        cat /tmp/namecheap_response.xml
        return 1
    fi
}

# Configure DNS records to point to Netlify
add_dns_record "@" "CNAME" "$NETLIFY_DOMAIN"

echo ""
echo "🎉 DNS configuration complete!"
echo ""
echo "Next steps:"
echo "1. Add custom domain in Netlify: netlify sites:update --domain=$DOMAIN"
echo "2. Wait 5-15 minutes for DNS propagation"
echo "3. Netlify will automatically provision SSL certificate"
echo ""
echo "Test with: dig $DOMAIN"