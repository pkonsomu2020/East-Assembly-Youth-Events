import { SITE_CONFIG } from '../../data/siteConfig';

export function TillBox({ totalLabel }: { totalLabel?: string }) {
  return (
    <div className="till-box">
      Pay via Till Number <b>{SITE_CONFIG.tillNumber}</b>
      <br />
      Name that appears: <b>{SITE_CONFIG.tillName}</b>
      {totalLabel && (
        <>
          <br />
          <span className="small-note">Total due: <b>{totalLabel}</b></span>
        </>
      )}
    </div>
  );
}
