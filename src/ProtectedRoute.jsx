import { useAuth } from './context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
	const { loading, isAuthenticated } = useAuth();
	if (loading)
		return (
			<div className='h-screen flex text-[60px] justify-center items-center bg-yellow-900'>
				<div className='animate-bouncing animate-delay-100 animate-iteration-count-infinite'>
					L
				</div>
				<div className='animate-bouncing animate-delay-150 animate-iteration-count-infinite'>
					o
				</div>
				<div className='animate-bouncing animate-delay-200 animate-iteration-count-infinite'>
					a
				</div>
				<div className='animate-bouncing animate-delay-250 animate-iteration-count-infinite'>
					d
				</div>
				<div className='animate-bouncing animate-delay-300 animate-iteration-count-infinite'>
					i
				</div>
				<div className='animate-bouncing animate-delay-400 animate-iteration-count-infinite'>
					n
				</div>
				<div className='animate-bouncing animate-delay-500 animate-iteration-count-infinite'>
					g
				</div>
				<div className='animate-bouncing animate-delay-700 animate-iteration-count-infinite'>
					.
				</div>
				<div className='animate-bouncing animate-delay-800 animate-iteration-count-infinite'>
					.
				</div>
				<div className='animate-bouncing animate-delay-900 animate-iteration-count-infinite'>
					.
				</div>
			</div>
		);
	if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;

	return <Outlet />;
}

export default ProtectedRoute;
