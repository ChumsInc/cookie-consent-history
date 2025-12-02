export interface UserLinkProps {
    userId: number|string|null;
    name: string|null;
    ipAddress: string|null;
}

export default function UserLink({userId, name, ipAddress}: UserLinkProps) {
    if (!userId) {
        return <span className="text-muted fst-italic">{ipAddress}</span>
    }
    return (
        <a href={`/apps/user-admin/#/${userId}`}>{name ?? 'unknown'}</a>
    )
}
