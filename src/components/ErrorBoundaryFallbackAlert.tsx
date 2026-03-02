import type {FallbackProps} from "react-error-boundary";
import Alert from "react-bootstrap/Alert";

export default function ErrorBoundaryFallbackAlert({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert color="danger" dismissible onClose={resetErrorBoundary}>
            <strong>Something went wrong!</strong>
            <div className="text-light">
                {typeof error === 'string' && (
                    <div>{error}</div>
                )}
                {error instanceof Error && (
                    <div>{error.name}: {error.message}</div>
                )}
            </div>
        </Alert>
    )
}
