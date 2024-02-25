import { useAuth } from './context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
	const { loading, isAuthenticated } = useAuth();
	if (loading)
		return (
			<div className='h-screen flex text-[60px] justify-center items-center'>
				<div>Loading</div>
				<div className='animate-bouncing animate-delay-100 animate-iteration-count-infinite'>
					.
				</div>
				<div className='animate-bouncing animate-delay-200 animate-iteration-count-infinite'>
					.
				</div>
				<div className='animate-bouncing animate-delay-300 animate-iteration-count-infinite'>
					.
				</div>  
			</div>
		);
	if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;

	return <Outlet />;
}

export default ProtectedRoute;
