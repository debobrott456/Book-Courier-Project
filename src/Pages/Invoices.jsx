import { use } from 'react';
import { FileText, CreditCard } from 'lucide-react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/Context';

const Invoices = () => {
    const { user } = use(AuthContext);
    const axiossecure = UseAxiosSecure();
    
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiossecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3">
                    <FileText className="text-[#d34e2d]" size={28} />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Payment <span className="text-[#d34e2d]">History</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Total Transactions: {payments.length}</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Book Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                    Transaction ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                                    Tracking ID
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={16} className="text-green-600" />
                                            {payment.parcelName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {payment.amount} Tk
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                                        <code className="px-2 py-1 bg-gray-100 rounded text-xs">
                                            {payment.transactionId}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                                        <code className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                            {payment.trackingId}
                                        </code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500">No payment history found.</p>
                    </div>
                )}
            </div>

            {/* Summary Card */}
            {payments.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                            <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                            <p className="text-2xl font-bold text-green-600">
                                {payments.reduce((sum, p) => sum + Number(p.amount), 0)} Tk
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Average Order</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round(payments.reduce((sum, p) => sum + Number(p.amount), 0) / payments.length)} Tk
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoices;
