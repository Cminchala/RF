(function ($) {
    

   
    let source = asi_session_data.source;
    let keyword = asi_session_data.keyword;
    let fbclid = asi_session_data.fbclid;
    let gclid = asi_session_data.gclid;
    let campaign = asi_session_data.campaign;
    let adgroup = asi_session_data.adgroup;
    let agent = asi_session_data.agent;
    let current_url = window.location.href;
    let landing = current_url.split("?")[0];
    let utm_source = asi_session_data.utm_source;
    let utm_medium = asi_session_data.utm_medium;
    let utm_campaign = asi_session_data.utm_campaign;
    let utm_content = asi_session_data.utm_content;
    let utm_term = asi_session_data.utm_term;
    
    let matomoClock = setInterval(function() {
        if(window.Matomo) {
            let tracker = Matomo.getTracker();
            let visitor_id = tracker.getVisitorId();
            let referrer = tracker.getAttributionReferrerUrl();
            
            // console.log(tracking);
            $.ajaxSetup({
                cache: true
            });
            $.ajax({
                url: asi_session_data.ajaxurl,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'ajax_pass_session_data',
                    matomo_visitor_id: visitor_id,
                    referrer_url: referrer,
                    landing: landing,
                    source: source,
                    keyword: keyword,
                    fbclid: fbclid,
                    gclid: gclid,
                    campaign:campaign,
                    adgroup:adgroup,
                    agent: agent,
                    current: current_url,
                    utm_source: utm_source,
                    utm_medium: utm_medium,
                    utm_campaign: utm_campaign,
                    utm_content: utm_content,
                    utm_term: utm_term,
                    nonce: autolab.nonce,
                },
                success: function( html ) {
                    console.log(html);
                },
                error: function(html) {
                    console.log('error');
                }
            });
            clearInterval(matomoClock);
        }
    }, 100);

})(jQuery);