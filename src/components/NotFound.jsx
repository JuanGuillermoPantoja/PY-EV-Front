import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-900">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-lg">La página que buscas no existe.</p>
    </div>
  );
};

export default NotFoundPage;
