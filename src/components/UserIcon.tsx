export interface UserIconProps {
    accountType: number|null;
}

export default function UserIcon({accountType}: UserIconProps) {
    switch (accountType) {
        case 1:
            return <span className="bi-person-fill" />;
        case 2:
            return <span className="bi-people-fill" />;
        case 4:
            return <span className="bi-cart-fill" />;
        default:
            return <span className="text-muted bi-question-circle" />;
    }
}
