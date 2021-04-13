'use strict';

const PROXY_STRING = 'PROXY vpn.liquinix.com:10444';

//spcify exactly
const allowed = [
    "bo.igmfx.com",
    "crm.alpsmarket.net",
    "eu.excentral.com",
    "crm.excentral-int.com",
    "excentral-eu.liquinix.net",
    "excentral-eu.sip.liquinix.net",
    "igmfx.liquinix.net",
    "igmfx.sip.liquinix.net"
];
// allow any subdomain:
const allowed_domains = [
    "igmfx.com",
    "alpsmarket.net",
    "excentral.com",
    "excentral-int.com",
    "liquinix.net"
];

//alert("!!!!!!!!! PAC script start parse !!!!!!!!");

function FindProxyForURL(url, hostname) {
    alert("Got request for (" + url + " with host: " + hostname + ")");

    //if (isInNet(myIpAddress(), "10.0.0.0", "255.0.0.0"))
    //    return "DIRECT";

    // Remove last dot.
    if (hostname[hostname.length - 1] === '.') {
        hostname = hostname.replace(/\.+$/g, '');
    }
    if (hostname[0] === '.') {
        // Yes, it's possible, e.g. `fetch(https://...google.com)`.
        // `fetch(https://.)` should fail though.
        hostname = hostname.replace(/^\.+/g, '');
    }

    if (!isResolvable(hostname)) {
        return "DIRECT";
    }

    for (i = 0; i < allowed_domains.length; i++) {
        if (hostname.includes(allowed_domains[i])) {
            alert("PROXY: found in allowed_domains");
            return PROXY_STRING;
        }
    }
    if (allowed.indexOf(hostname) >= 0) {
        alert("PROXY: found in allowed");
        return PROXY_STRING;

    }
    alert("DIRECT: not found");


    return "DIRECT";

}
//alert("!!!!!!!!! PAC script done parse !!!!!!!!");