import { useState } from 'react';
import type { MerchItem } from '../../types/domain';
import { GARMENT_ICONS } from './icons';
import { Modal } from '../common/Modal';
import { MerchOrderForm } from './MerchOrderForm';

export function MerchCard({ item }: { item: MerchItem }) {
  const [open, setOpen] = useState(false);

  if (item.comingSoon) {
    return (
      <div className="card">
        <h3>{item.name}s</h3>
        <p>Details and pricing to be updated soon. Check back shortly or contact us for more info.</p>
        <span className="small-note">Coming soon</span>
      </div>
    );
  }

  const Icon = item.id !== 'book' ? GARMENT_ICONS[item.id] : undefined;

  return (
    <div className={`card${Icon ? ' card-media' : ''}`}>
      {Icon && (
        <div className="merch-icon-box">
          <Icon />
        </div>
      )}
      <div className={Icon ? 'card-body' : undefined}>
        <h3>{item.name}</h3>
        <p className="card-price">Ksh {item.price!.toLocaleString()}</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
          Order {item.name}
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title={`Order ${item.name}`}>
          <MerchOrderForm item={item} />
        </Modal>
      </div>
    </div>
  );
}
