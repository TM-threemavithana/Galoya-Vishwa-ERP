<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Date:</label>
        <input
          type="date"
          className="w-full border rounded-lg p-2"
          value={distributionData.date}
          onChange={(e) => setDistributionData({ ...distributionData, date: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Vehicle No:</label>
        <select
          className="w-full border rounded-lg p-2"
          value={distributionData.vehicleNumber}
          onChange={(e) => setDistributionData({ ...distributionData, vehicleNumber: e.target.value })}
        >
          <option value="">Select Vehicle</option>
          {/* Add options dynamically if needed */}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Route:</label>
        <select
          className="w-full border rounded-lg p-2"
          value={distributionData.route}
          onChange={(e) => setDistributionData({ ...distributionData, route: e.target.value })}
        >
          <option value="">Select Route</option>
          {/* Add options dynamically if needed */}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Ref Name:</label>
        <select
          className="w-full border rounded-lg p-2"
          value={distributionData.refName}
          onChange={(e) => setDistributionData({ ...distributionData, refName: e.target.value })}
        >
          <option value="">Select Reference</option>
          {/* Add options dynamically if needed */}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Driver Name:</label>
        <select
          className="w-full border rounded-lg p-2"
          value={distributionData.driverName}
          onChange={(e) => setDistributionData({ ...distributionData, driverName: e.target.value })}
        >
          <option value="">Select Driver</option>
          {/* Add options dynamically if needed */}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Diesel:</label>
        <input
          type="number"
          className="w-full border rounded-lg p-2"
          value={distributionData.diesel}
          onChange={(e) => setDistributionData({ ...distributionData, diesel: e.target.value })}
        />
      </div>
    </div>