import React from 'react'

const LegalNotesPage = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!-- OneTrust Privacy Notice start -->
        <!-- Container in which the privacy notice will be rendered -->
        <div id="otnotice-d326585b-be5b-404e-a42b-002e4db30841" class="otnotice"></div>
        
        <script src="https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js" type="text/javascript" charset="UTF-8" id="otprivacy-notice-script">
            settings="eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9"
          </script>
        
        <script type="text/javascript" charset="UTF-8">
            // To ensure external settings are loaded, use the Initialized promise:
            OneTrust.NoticeApi.Initialized.then(function() {
              OneTrust.NoticeApi.LoadNotices(["https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/d326585b-be5b-404e-a42b-002e4db30841.json"]);
            });
          </script>
          
        <!-- OneTrust Privacy Notice end -->`,
      }}
    ></div>
  )
}

export default LegalNotesPage
