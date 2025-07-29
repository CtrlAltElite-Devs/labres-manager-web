import { LabResult } from "@/types"
import {
  Activity,
  Droplets,
  Heart,
  Zap,
  Shield,
  Microscope,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"


export const testTypeIcons = {
  blood: Droplets,
  urine: Activity,
  cardiac: Heart,
  metabolic: Zap,
  immune: Shield,
  microscopy: Microscope,
}

export const generateDummyResults = (userPid: string): LabResult[] => {
  const tests = [
    { name: "Complete Blood Count (CBC)", type: "blood" },
    { name: "Basic Metabolic Panel", type: "blood" },
    { name: "Lipid Panel", type: "blood" },
    { name: "Thyroid Function Test", type: "blood" },
    { name: "Liver Function Test", type: "blood" },
    { name: "Hemoglobin A1C", type: "blood" },
    { name: "Vitamin D Test", type: "blood" },
    { name: "Urinalysis", type: "urine" },
    { name: "C-Reactive Protein", type: "immune" },
    { name: "Prostate Specific Antigen", type: "blood" },
    { name: "Cholesterol Test", type: "blood" },
    { name: "Blood Glucose Test", type: "blood" },
    { name: "Kidney Function Test", type: "blood" },
    { name: "Iron Studies", type: "blood" },
    { name: "Cardiac Enzymes", type: "cardiac" },
    { name: "Electrolyte Panel", type: "metabolic" },
    { name: "Protein Electrophoresis", type: "blood" },
    { name: "Urine Culture", type: "urine" },
    { name: "Blood Culture", type: "microscopy" },
    { name: "Troponin Test", type: "cardiac" },
  ]

  return Array.from({ length: 47 }, (_, i) => {
    const test = tests[i % tests.length]
    return {
      id: `lab_${i + 1}`,
      userPid,
      testName: test.name,
      testDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    }
  })
}
