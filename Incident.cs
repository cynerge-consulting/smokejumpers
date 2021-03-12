using System;
using System.Collections.Generic;

namespace revertChutes.Data2
{
    public partial class Incident
    {
        public Incident()
        {
            IncidentAttachment = new HashSet<IncidentAttachment>();
            IncidentJumper = new HashSet<IncidentJumper>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string DispFromBase { get; set; }
        public string ReturnToBase { get; set; }
        public string Usfs { get; set; }
        public string Blm { get; set; }
        public string IncidentName { get; set; }
        public string UnitName { get; set; }
        public double HobbsTime { get; set; }
        public DateTime TDate { get; set; }
        public string DepartTime { get; set; }
        public string ArriveTime { get; set; }
        public string Mode { get; set; }
        public string Mission { get; set; }
        public string Type { get; set; }
        public double? Acres { get; set; }
        public string SizeClass { get; set; }
        public decimal? Hours { get; set; }
        public string InitialAttack { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public int? NumberPers { get; set; }
        public string BaseName { get; set; }
        public string FuelType { get; set; }
        public string FireNumber { get; set; }
        public double? YardsofDrift { get; set; }
        public bool? PcMalfunction { get; set; }
        public string PcNumberBundles { get; set; }
        public string PcTotalWeight { get; set; }
        public string Year { get; set; }
        public int? Pilot1Id { get; set; }
        public int? Pilot2Id { get; set; }
        public int TravelModeId { get; set; }
        public int? AreaId { get; set; }
        public int? CustomerId { get; set; }
        public int? AgencyId { get; set; }
        public int? StateId { get; set; }
        public int? Spotter1Id { get; set; }
        public int? Spotter2Id { get; set; }
        public int? SpotterTraineeId { get; set; }
        public string Note { get; set; }

        public Agency Agency { get; set; }
        public Area Area { get; set; }
        public Customers Customer { get; set; }
        public Personnel Spotter1 { get; set; }
        public Personnel Spotter2 { get; set; }
        public Personnel SpotterTrainee { get; set; }
        public TravelMode TravelMode { get; set; }
        public ICollection<IncidentAttachment> IncidentAttachment { get; set; }
        public ICollection<IncidentJumper> IncidentJumper { get; set; }
    }
}
