export class WeatherInfo {
  constructor(
    public id: number,
    public name: string,
    public main: Object,
    public weather: Object[]) { }
}