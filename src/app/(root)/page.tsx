/**
 * Entry point "/". Portuguese is the default language; a previously chosen language
 * (stored when the visitor switches) is respected. Works on any static host.
 */
export default function RootPage() {
  const script = `(function(){var l='pt';try{if(localStorage.getItem('lang')==='en')l='en'}catch(e){}location.replace('/'+l+'/'+location.hash)})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/pt/" />
      </noscript>
      <main style={{ padding: "4rem 1rem", textAlign: "center", fontFamily: "system-ui" }}>
        <a href="/pt/">Português</a> · <a href="/en/">English</a>
      </main>
    </>
  );
}
