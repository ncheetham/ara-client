import { Engagement } from "../engagement";
import { Theme } from "../../theme";
import { ThemeComponent } from "../../theme/theme.component";

export class EngagementTheme
 {
  engagementThemeId: number ;
  engagement: Engagement ;
  theme: Theme ;

  constructor() {
    this.engagement = new Engagement() ;
    this.theme = {themeId: 0, name: ''} ;
    this.engagementThemeId = 0 ;
  }

 }
