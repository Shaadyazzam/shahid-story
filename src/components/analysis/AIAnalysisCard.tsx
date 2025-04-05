
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileCheck, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface AIAnalysisCardProps {
  mediaType: string;
  detections: {
    label: string;
    confidence: number;
    severity?: 'low' | 'medium' | 'high';
  }[];
  authenticity: {
    score: number;
    flags: string[];
  };
  metadata: {
    label: string;
    value: string;
    available: boolean;
  }[];
  language: 'en' | 'ar';
}

export const AIAnalysisCard = ({
  mediaType,
  detections,
  authenticity,
  metadata,
  language
}: AIAnalysisCardProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-shahid-purple" />
            {language === 'en' ? 'AI Content Detection' : 'كشف المحتوى بالذكاء الاصطناعي'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detections.map((detection, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{detection.label}</span>
                    {detection.severity && (
                      <Badge variant={
                        detection.severity === 'high' ? 'destructive' :
                        detection.severity === 'medium' ? 'default' : 'outline'
                      }>
                        {detection.severity}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(detection.confidence * 100)}%
                  </span>
                </div>
                <Progress value={detection.confidence * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {authenticity.score > 0.8 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : authenticity.score > 0.5 ? (
              <Info className="h-5 w-5 text-shahid-blue" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-shahid-red" />
            )}
            {language === 'en' ? 'Authenticity Check' : 'التحقق من الأصالة'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Authenticity Score' : 'درجة الأصالة'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(authenticity.score * 100)}%
                </span>
              </div>
              <Progress 
                value={authenticity.score * 100} 
                className="h-2"
                style={{
                  backgroundColor: authenticity.score > 0.8 ? '#10b981' : 
                                  authenticity.score > 0.5 ? '#0ea5e9' : '#ef4444'
                }}
              />
            </div>

            {authenticity.flags.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  {language === 'en' ? 'Potential Issues Detected:' : 'المشاكل المحتملة المكتشفة:'}
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {authenticity.flags.map((flag, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-shahid-red" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-shahid-blue" />
            {language === 'en' ? 'Metadata Extraction' : 'استخراج البيانات الوصفية'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox id={`metadata-${index}`} checked={item.available} disabled />
                <Label 
                  htmlFor={`metadata-${index}`}
                  className={`text-sm ${!item.available ? 'text-muted-foreground line-through' : ''}`}
                >
                  {item.label}: {item.available ? item.value : language === 'en' ? 'Not available' : 'غير متاح'}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
